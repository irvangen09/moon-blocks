<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// The plugin is not loaded during uninstall, so the option name is repeated here.
if ( is_multisite() ) {
	// WordPress runs this file once per network, and the option is stored per site.
	$moon_blocks_site_ids = get_sites(
		array(
			'fields' => 'ids',
			'number' => 0,
		)
	);

	foreach ( $moon_blocks_site_ids as $moon_blocks_site_id ) {
		switch_to_blog( $moon_blocks_site_id );
		delete_option( 'moon_blocks_settings' );
		restore_current_blog();
	}
} else {
	delete_option( 'moon_blocks_settings' );
}
