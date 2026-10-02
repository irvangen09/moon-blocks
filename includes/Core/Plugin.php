<?php

namespace MoonBlocks\Core;

use MoonBlocks\Blocks\BlockRegistry;
use MoonBlocks\Services\DesignTokens;
use MoonBlocks\Settings\SettingsPage;
use MoonBlocks\Settings\SettingsRegistry;

class Plugin {

	public function run(): void {
		$settings = new SettingsRegistry();
		$settings->register();

		( new DesignTokens( $settings ) )->register();

		$blocks = new BlockRegistry( $settings );
		$blocks->register();

		// The settings screen needs the full block list, including disabled blocks.
		if ( is_admin() ) {
			( new SettingsPage( $blocks ) )->register();
		}
	}
}