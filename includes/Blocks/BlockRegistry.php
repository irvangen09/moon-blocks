<?php

namespace MoonBlocks\Blocks;

use MoonBlocks\Settings\SettingsRegistry;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class BlockRegistry {

	private const NAMESPACE_PREFIX = 'moon-blocks/';

	private const CATEGORY = 'moon-blocks';

	private SettingsRegistry $settings;

	private ?array $blocks = null;

	private ?array $disabled = null;

	public function __construct( SettingsRegistry $settings ) {
		$this->settings = $settings;
	}

	public function register(): void {
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'add_category' ) );
	}

	public function register_blocks(): void {
		foreach ( $this->discover() as $name => $block ) {
			if ( $this->is_enabled( $name ) ) {
				register_block_type( $block['dir'] );
			}
		}
	}

	public function add_category( array $categories ): array {
		$categories[] = array(
			'slug'  => self::CATEGORY,
			'title' => __( 'Moon Blocks', 'moon-blocks' ),
		);

		return $categories;
	}

	/**
	 * Returns every block that has its own switch in Settings, including disabled
	 * ones. Child blocks are left out because they follow their parent.
	 */
	public function get_blocks(): array {
		$blocks = array();
		$schema = get_block_metadata_i18n_schema();

		foreach ( $this->discover() as $name => $block ) {
			if ( $this->has_moon_parent( $block ) ) {
				continue;
			}

			$title = $block['title'];

			if ( '' !== $block['textdomain'] && isset( $schema->title ) ) {
				$title = translate_settings_using_i18n_schema( $schema->title, $title, $block['textdomain'] );
			}

			$blocks[] = array(
				'name'  => $name,
				'title' => $title,
			);
		}

		usort(
			$blocks,
			static fn( $a, $b ) => strnatcasecmp( $a['title'], $b['title'] )
		);

		return $blocks;
	}

	/**
	 * A block is enabled unless it is switched off, or every Moon Blocks parent
	 * it can be placed in is disabled.
	 */
	private function is_enabled( string $name, array $visited = array() ): bool {
		$this->disabled ??= $this->settings->get_disabled_blocks();

		if ( in_array( $name, $this->disabled, true ) || in_array( $name, $visited, true ) ) {
			return false;
		}

		$blocks  = $this->discover();
		$parents = array_filter(
			$blocks[ $name ]['parent'] ?? array(),
			static fn( $parent_name ) => isset( $blocks[ $parent_name ] )
		);

		if ( empty( $parents ) ) {
			return true;
		}

		$visited[] = $name;

		foreach ( $parents as $parent_name ) {
			if ( $this->is_enabled( $parent_name, $visited ) ) {
				return true;
			}
		}

		return false;
	}

	private function has_moon_parent( array $block ): bool {
		$blocks = $this->discover();

		foreach ( $block['parent'] as $parent_name ) {
			if ( isset( $blocks[ $parent_name ] ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Finds every block.json under build/, keyed by block name. Results are kept
	 * for the rest of the request.
	 */
	private function discover(): array {
		if ( null !== $this->blocks ) {
			return $this->blocks;
		}

		$this->blocks = array();
		$build_dir    = MOON_BLOCKS_DIR . 'build';

		if ( ! is_dir( $build_dir ) ) {
			return $this->blocks;
		}

		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( $build_dir, RecursiveDirectoryIterator::SKIP_DOTS )
		);

		foreach ( $files as $file ) {
			if ( 'block.json' !== $file->getFilename() ) {
				continue;
			}

			$metadata = wp_json_file_decode( $file->getPathname(), array( 'associative' => true ) );
			$name     = is_array( $metadata ) ? ( $metadata['name'] ?? null ) : null;

			if ( ! is_string( $name ) || ! str_starts_with( $name, self::NAMESPACE_PREFIX ) ) {
				continue;
			}

			$this->blocks[ $name ] = array(
				'dir'        => $file->getPath(),
				'title'      => is_string( $metadata['title'] ?? null ) ? $metadata['title'] : $name,
				'textdomain' => is_string( $metadata['textdomain'] ?? null ) ? $metadata['textdomain'] : '',
				'parent'     => array_values( array_filter( (array) ( $metadata['parent'] ?? array() ), 'is_string' ) ),
			);
		}

		ksort( $this->blocks );

		return $this->blocks;
	}
}