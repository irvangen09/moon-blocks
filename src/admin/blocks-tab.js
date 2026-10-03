import { __ } from '@wordpress/i18n';
import { Card, CardBody, ToggleControl } from '@wordpress/components';

export default function BlocksTab( { blocks, disabled, onChange } ) {
	if ( blocks.length === 0 ) {
		return <p>{ __( 'No blocks are available yet.', 'moon-blocks' ) }</p>;
	}

	const toggle = ( name, isEnabled ) =>
		onChange(
			isEnabled
				? disabled.filter( ( item ) => item !== name )
				: [ ...disabled, name ]
		);

	return (
		<>
			<p>
				{ __(
					'Turn off the blocks you do not need. A disabled block is not available in the editor and loads no CSS or JavaScript. Content that already uses it may no longer display as intended.',
					'moon-blocks'
				) }
			</p>
			<Card>
				<CardBody className="moon-settings__blocks">
					{ blocks.map( ( block ) => (
						<ToggleControl
							__nextHasNoMarginBottom
							key={ block.name }
							label={ block.title }
							checked={ ! disabled.includes( block.name ) }
							onChange={ ( isEnabled ) =>
								toggle( block.name, isEnabled )
							}
						/>
					) ) }
				</CardBody>
			</Card>
		</>
	);
}