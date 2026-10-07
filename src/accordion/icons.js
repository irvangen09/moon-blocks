const PATHS = [
	'M4 6h9',
	'M16.5 5l2 2 2-2',
	'M4 12h9',
	'M16.5 11l2 2 2-2',
	'M4 18h9',
	'M16.5 17l2 2 2-2',
];

export function AccordionIcon( { className } ) {
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
			{ PATHS.map( ( d ) => (
				<path key={ d } d={ d } />
			) ) }
		</svg>
	);
}
