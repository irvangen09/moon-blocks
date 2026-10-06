import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit';
import { CalloutIcon } from './icons';
import save from './save';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: <CalloutIcon variant="info" />,
	edit: Edit,
	save,
} );