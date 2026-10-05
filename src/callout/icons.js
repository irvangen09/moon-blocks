const PATHS = {
	info: [ 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 11v5', 'M12 7.5h.01' ],
	tips: [
		'M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.2 1.1 2.2h5c0-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3z',
		'M9.5 18.5h5',
		'M10.5 21h3',
	],
	warning: [ 'M12 4 3 19.5h18L12 4z', 'M12 10v4', 'M12 16.8h.01' ],
	important: [
		'M8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5v-7L8.5 3z',
		'M12 7.5v5',
		'M12 16h.01',
	],
};

// Unknown variants fall back to the info icon.
export function CalloutIcon( { variant, className } ) {
	const paths = PATHS[ variant ] || PATHS.info;

	return (
		<svg
			className={ className }
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			{ paths.map( ( d ) => (
				<path key={ d } d={ d } />
			) ) }
		</svg>
	);
}