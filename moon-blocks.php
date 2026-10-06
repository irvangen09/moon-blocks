<?php
/**
 * Plugin Name:       Moon Blocks
 * Description:       Lightweight Gutenberg blocks for documentation, wiki, and knowledge base websites.
 * Version:           0.2.0
 * Requires at least: 6.9
 * Requires PHP:      8.0
 * Author:            Irvan Noerfazri
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       moon-blocks
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) || exit;

// Checked before any class is loaded: the classes use syntax that older PHP cannot parse.
if ( version_compare( PHP_VERSION, '8.0', '<' ) || version_compare( get_bloginfo( 'version' ), '6.9', '<' ) ) {
	add_action(
		'admin_notices',
		function () {
			if ( current_user_can( 'activate_plugins' ) ) {
				printf(
					'<div class="notice notice-error"><p>%s</p></div>',
					esc_html__( 'Moon Blocks requires PHP 8.0 or later and WordPress 6.9 or later.', 'moon-blocks' )
				);
			}
		}
	);
	return;
}

define( 'MOON_BLOCKS_VERSION', '0.2.0' );
define( 'MOON_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'MOON_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

require_once MOON_BLOCKS_DIR . 'includes/Core/Autoloader.php';

( new \MoonBlocks\Core\Autoloader( 'MoonBlocks\\', MOON_BLOCKS_DIR . 'includes/' ) )->register();

add_action(
	'plugins_loaded',
	function () {
		( new \MoonBlocks\Core\Plugin() )->run();
	}
);
