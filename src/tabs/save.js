import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( { className: 'moon-tabs' } );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <div { ...innerBlocksProps } />;
}
