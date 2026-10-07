import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { openOnDesktop } = attributes;

	const blockProps = useBlockProps.save( {
		className: openOnDesktop
			? 'moon-accordion moon-accordion--open-desktop'
			: 'moon-accordion',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <div { ...innerBlocksProps } />;
}
