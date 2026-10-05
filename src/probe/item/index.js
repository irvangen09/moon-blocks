import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

function Edit() {
	return <div { ...useBlockProps( { className: 'moon-probe-item' } ) } />;
}

function save() {
	return (
		<div { ...useBlockProps.save( { className: 'moon-probe-item' } ) } />
	);
}

registerBlockType( metadata.name, { edit: Edit, save } );
