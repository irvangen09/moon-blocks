import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit';
import { TabsIcon } from './icons';
import save from './save';
import itemMetadata from './item/block.json';
import ItemEdit from './item/edit';
import itemSave from './item/save';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	icon: <TabsIcon />,
	edit: Edit,
	save,
} );

registerBlockType( itemMetadata.name, {
	icon: <TabsIcon />,
	edit: ItemEdit,
	save: itemSave,
} );
