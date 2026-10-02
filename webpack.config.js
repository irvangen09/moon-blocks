const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	// Evaluated lazily so blocks added while `start` is running are still found.
	entry: () => ( {
		...defaultConfig.entry(),
		// The admin settings app is not a block, so block.json discovery misses it.
		'admin/index': path.resolve( __dirname, 'src/admin/index.js' ),
	} ),
};