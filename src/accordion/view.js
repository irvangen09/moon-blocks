import { MOBILE_BREAKPOINT } from '../shared/breakpoint';

const ACCORDION = '.moon-accordion--open-desktop';
const ITEM = '.moon-accordion-item';

function syncItems( isDesktop ) {
	document
		.querySelectorAll( `${ ACCORDION } > ${ ITEM }` )
		.forEach( ( item ) => {
			item.open = isDesktop;
		} );
}

// Opens every item that contains the hash target, including nested ones.
function openFromHash() {
	let id;

	try {
		id = decodeURIComponent( window.location.hash.slice( 1 ) );
	} catch {
		return;
	}

	const target = id ? document.getElementById( id ) : null;

	if ( ! target ) {
		return;
	}

	let opened = false;
	let item = target.closest( ITEM );

	while ( item ) {
		if ( ! item.open ) {
			item.open = true;
			opened = true;
		}

		item = item.parentElement?.closest( ITEM );
	}

	if ( opened ) {
		target.scrollIntoView();
	}
}

function init() {
	const desktop = window.matchMedia(
		`(min-width: ${ MOBILE_BREAKPOINT + 1 }px)`
	);

	syncItems( desktop.matches );
	openFromHash();

	// Sync only when crossing the breakpoint, so a visitor's own
	// open/close choices survive resizes within the same range.
	desktop.addEventListener( 'change', ( event ) => {
		syncItems( event.matches );
	} );

	window.addEventListener( 'hashchange', openFromHash );
}

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
