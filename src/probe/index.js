import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import './style.scss';

const ALLOWED_BLOCKS = [ 'moon-blocks/probe-item' ];
const TEMPLATE = [ [ 'moon-blocks/probe-item' ], [ 'moon-blocks/probe-item' ] ];

function Edit() {
	const blockProps = useBlockProps( { className: 'moon-probe' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'moon-probe__items' },
		{ allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE }
	);

	return (
		<div { ...blockProps }>
			<p className="moon-probe__title">
				{ __( 'Moon Probe', 'moon-blocks' ) }
			</p>
			<div { ...innerBlocksProps } />
		</div>
	);
}

function save() {
	const blockProps = useBlockProps.save( { className: 'moon-probe' } );
	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'moon-probe__items',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}

registerBlockType( metadata.name, { edit: Edit, save } );
