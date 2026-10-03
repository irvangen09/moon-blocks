import { __ } from '@wordpress/i18n';
import {
	Button,
	Card,
	CardBody,
	ColorIndicator,
	ColorPicker,
	Dropdown,
} from '@wordpress/components';

// Shown in the picker while no override is set; nothing is saved until the user picks.
const PICKER_START_COLOR = '#757575';

export default function AppearanceTab( { colors, onChange } ) {
	const fields = [
		{
			key: 'primary',
			label: __( 'Primary', 'moon-blocks' ),
			help: __(
				'Accent for active items, indicators and icons.',
				'moon-blocks'
			),
		},
		{
			key: 'surface',
			label: __( 'Surface', 'moon-blocks' ),
			help: __( 'Background of panels, cards and code.', 'moon-blocks' ),
		},
		{
			key: 'border',
			label: __( 'Border', 'moon-blocks' ),
			help: __( 'Lines and dividers.', 'moon-blocks' ),
		},
	];

	const setColor = ( key, value ) =>
		onChange( { ...colors, [ key ]: value } );

	return (
		<>
			<p>
				{ __(
					'Colors you leave unset follow your theme. Make sure a color you choose has enough contrast with your theme.',
					'moon-blocks'
				) }
			</p>
			<Card>
				<CardBody className="moon-settings__colors">
					{ fields.map( ( { key, label, help } ) => (
						<div className="moon-settings__color" key={ key }>
							<div className="moon-settings__color-label">
								<strong>{ label }</strong>
								<span>{ help }</span>
							</div>
							<Dropdown
								popoverProps={ { placement: 'bottom-start' } }
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Button
										variant="secondary"
										aria-expanded={ isOpen }
										onClick={ onToggle }
									>
										<ColorIndicator
											colorValue={ colors[ key ] }
										/>
										<span>
											{ colors[ key ] ||
												__(
													'Theme default',
													'moon-blocks'
												) }
										</span>
									</Button>
								) }
								renderContent={ () => (
									<ColorPicker
										color={
											colors[ key ] || PICKER_START_COLOR
										}
										onChange={ ( value ) =>
											setColor( key, value )
										}
									/>
								) }
							/>
							<Button
								variant="tertiary"
								disabled={ ! colors[ key ] }
								onClick={ () => setColor( key, '' ) }
							>
								{ __( 'Reset', 'moon-blocks' ) }
							</Button>
						</div>
					) ) }
				</CardBody>
			</Card>
		</>
	);
}