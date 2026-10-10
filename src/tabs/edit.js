import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'moon-blocks/tabs-item' ];

const TEMPLATE = [ [ 'moon-blocks/tabs-item' ], [ 'moon-blocks/tabs-item' ] ];

// The editor stacks every item instead of switching tabs, so the default
// vertical orientation matches what the writer sees.
export default function Edit() {
	const blockProps = useBlockProps( { className: 'moon-tabs' } );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
