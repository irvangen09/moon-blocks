const PATHS = [ 'M4 19V9h16v10z', 'M4 9V6h6v3', 'M13 9V7h4v2' ];

export function TabsIcon( { className } ) {
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
