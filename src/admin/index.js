import {
	createRoot,
	useCallback,
	useEffect,
	useState,
} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { Button, Notice, Spinner, TabPanel } from '@wordpress/components';

import AppearanceTab from './appearance-tab';
import BlocksTab from './blocks-tab';
import './style.scss';

function SettingsApp( { option, blocks } ) {
	const [ settings, setSettings ] = useState( null );
	const [ saved, setSaved ] = useState( null );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const applyResponse = useCallback(
		( response ) => {
			setSettings( response[ option ] );
			setSaved( response[ option ] );
		},
		[ option ]
	);

	const showError = useCallback(
		( error ) => setNotice( { status: 'error', message: error.message } ),
		[]
	);

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } )
			.then( applyResponse )
			.catch( showError );
	}, [ applyResponse, showError ] );

	const update = ( key ) => ( value ) =>
		setSettings( ( current ) => ( { ...current, [ key ]: value } ) );

	const save = () => {
		setIsSaving( true );
		setNotice( null );

		// The endpoint replaces the whole option, so send every key.
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { [ option ]: settings },
		} )
			.then( ( response ) => {
				applyResponse( response );
				setNotice( {
					status: 'success',
					message: __( 'Settings saved.', 'moon-blocks' ),
				} );
			} )
			.catch( showError )
			.finally( () => setIsSaving( false ) );
	};

	const isDirty = JSON.stringify( settings ) !== JSON.stringify( saved );

	return (
		<div className="moon-settings">
			{ notice && (
				<Notice
					status={ notice.status }
					onRemove={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			{ settings === null && ! notice && <Spinner /> }

			{ settings !== null && (
				<>
					<TabPanel
						tabs={ [
							{
								name: 'blocks',
								title: __( 'Blocks', 'moon-blocks' ),
							},
							{
								name: 'appearance',
								title: __( 'Appearance', 'moon-blocks' ),
							},
						] }
					>
						{ ( tab ) =>
							tab.name === 'blocks' ? (
								<BlocksTab
									blocks={ blocks }
									disabled={ settings.disabled_blocks }
									onChange={ update( 'disabled_blocks' ) }
								/>
							) : (
								<AppearanceTab
									colors={ settings.appearance }
									onChange={ update( 'appearance' ) }
								/>
							)
						}
					</TabPanel>

					<div className="moon-settings__footer">
						<Button
							variant="primary"
							isBusy={ isSaving }
							disabled={ ! isDirty || isSaving }
							onClick={ save }
						>
							{ __( 'Save Changes', 'moon-blocks' ) }
						</Button>
					</div>
				</>
			) }
		</div>
	);
}

const root = document.getElementById( 'moon-blocks-settings' );
const data = window.moonBlocksSettings;

if ( root && data ) {
	createRoot( root ).render(
		<SettingsApp option={ data.option } blocks={ data.blocks } />
	);
}