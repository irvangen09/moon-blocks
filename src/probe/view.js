import { MOBILE_BREAKPOINT } from '../shared/breakpoint';

const query = window.matchMedia( `(max-width: ${ MOBILE_BREAKPOINT }px)` );

function update() {
	const state = query.matches ? 'view.js loaded (mobile)' : 'view.js loaded';

	document.querySelectorAll( '.moon-probe' ).forEach( ( element ) => {
		element.dataset.moonProbeState = state;
	} );
}

function init() {
	update();
	query.addEventListener( 'change', update );
}

// The script can run before the document has been parsed.
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
