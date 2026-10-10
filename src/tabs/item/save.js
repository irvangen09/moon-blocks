import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

// The label is a plain div: without JavaScript it is only a section marker,
// and view.js replaces it with a real tab button.
export default function save( { attributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps.save( { className: 'moon-tabs-item' } );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'moon-tabs-item__content',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="div"
				className="moon-tabs-item__label"
				value={ label }
			/>
			<div { ...innerBlocksProps } />
		</div>
	);
}
