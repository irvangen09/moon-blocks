<?php

namespace MoonBlocks\Settings;

use MoonBlocks\Blocks\BlockRegistry;

class SettingsPage {

	private const SLUG   = 'moon-blocks';
	private const HANDLE = 'moon-blocks-admin';

	private BlockRegistry $blocks;

	private string $hook_suffix = '';

	public function __construct( BlockRegistry $blocks ) {
		$this->blocks = $blocks;
	}

	public function register(): void {
		add_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	public function add_page(): void {
		$this->hook_suffix = (string) add_options_page(
			__( 'Moon Blocks', 'moon-blocks' ),
			__( 'Moon Blocks', 'moon-blocks' ),
			'manage_options',
			self::SLUG,
			array( $this, 'render' )
		);
	}

	public function render(): void {
		if ( ! is_readable( $this->asset_file() ) ) {
			printf(
				'<div class="notice notice-error"><p>%s</p></div>',
				esc_html__( 'The Moon Blocks settings interface could not be loaded. Please reinstall the plugin.', 'moon-blocks' )
			);
			return;
		}
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<div id="moon-blocks-settings"></div>
		</div>
		<?php
	}

	public function enqueue_assets( string $hook ): void {
		if ( $hook !== $this->hook_suffix || ! is_readable( $this->asset_file() ) ) {
			return;
		}

		$asset = include $this->asset_file();

		wp_enqueue_style(
			self::HANDLE,
			MOON_BLOCKS_URL . 'build/admin/style-index.css',
			array( 'wp-components' ),
			$asset['version']
		);
		wp_style_add_data( self::HANDLE, 'rtl', 'replace' );

		wp_enqueue_script(
			self::HANDLE,
			MOON_BLOCKS_URL . 'build/admin/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
		wp_set_script_translations( self::HANDLE, 'moon-blocks', MOON_BLOCKS_DIR . 'languages' );

		$data = array(
			'option' => SettingsRegistry::OPTION,
			'blocks' => $this->blocks->get_blocks(),
		);

		wp_add_inline_script(
			self::HANDLE,
			'window.moonBlocksSettings = ' . wp_json_encode( $data, JSON_HEX_TAG | JSON_HEX_AMP ) . ';',
			'before'
		);
	}

	private function asset_file(): string {
		return MOON_BLOCKS_DIR . 'build/admin/index.asset.php';
	}
}