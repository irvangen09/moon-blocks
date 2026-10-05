<?php

namespace MoonBlocks\Settings;

class SettingsRegistry {

	public const OPTION = 'moon_blocks_settings';

	public function register(): void {
		add_action( 'init', array( $this, 'register_option' ) );
	}

	// Runs on init so the REST settings endpoint can see the option.
	public function register_option(): void {
		$defaults = $this->defaults();

		$color_properties = array();
		foreach ( array_keys( $defaults['appearance'] ) as $key ) {
			// An empty string clears the override.
			$color_properties[ $key ] = array(
				'type'    => 'string',
				'pattern' => '^(#([0-9a-fA-F]{3}){1,2})?$',
			);
		}

		register_setting(
			'moon_blocks',
			self::OPTION,
			array(
				'type'              => 'object',
				'default'           => $defaults,
				'sanitize_callback' => array( $this, 'sanitize' ),
				'show_in_rest'      => array(
					'schema' => array(
						'type'                 => 'object',
						'additionalProperties' => false,
						'properties'           => array(
							'disabled_blocks' => array(
								'type'  => 'array',
								'items' => array( 'type' => 'string' ),
							),
							'appearance'      => array(
								'type'                 => 'object',
								'additionalProperties' => false,
								'properties'           => $color_properties,
							),
						),
					),
				),
			)
		);
	}

	/**
	 * Returns a value containing only known keys and valid entries.
	 *
	 * @param mixed $value Raw option value.
	 */
	public function sanitize( $value ): array {
		$value    = is_array( $value ) ? $value : array();
		$settings = $this->defaults();

		if ( isset( $value['disabled_blocks'] ) && is_array( $value['disabled_blocks'] ) ) {
			$names = array_filter(
				$value['disabled_blocks'],
				static fn( $name ) => is_string( $name ) && 1 === preg_match( '/^moon-blocks\/[a-z][a-z0-9-]*$/', $name )
			);
			$names = array_unique( $names );
			sort( $names );

			$settings['disabled_blocks'] = $names;
		}

		foreach ( array_keys( $settings['appearance'] ) as $key ) {
			$color = $value['appearance'][ $key ] ?? '';

			// trim() because sanitize_hex_color() lets a trailing newline through.
			$settings['appearance'][ $key ] = is_string( $color ) ? (string) sanitize_hex_color( trim( $color ) ) : '';
		}

		return $settings;
	}

	public function get(): array {
		return $this->sanitize( get_option( self::OPTION, array() ) );
	}

	/**
	 * Returns the names of the blocks switched off in Settings.
	 */
	public function get_disabled_blocks(): array {
		return $this->get()['disabled_blocks'];
	}

	/**
	 * Returns the color overrides that are set, keyed by token name (primary, surface, border).
	 */
	public function get_color_overrides(): array {
		return array_filter( $this->get()['appearance'] );
	}

	private function defaults(): array {
		return array(
			'disabled_blocks' => array(),
			'appearance'      => array(
				'primary' => '',
				'surface' => '',
				'border'  => '',
			),
		);
	}
}
