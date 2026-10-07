import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, headingLevel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'moon-accordion-item',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'moon-accordion-item__content',
	} );

	// <summary> only allows phrasing content or one heading, so no <p> here.
	const titleTagName = 'none' === headingLevel ? 'span' : headingLevel;

	return (
		<details { ...blockProps }>
			<summary className="moon-accordion-item__summary">
				<RichText.Content
					tagName={ titleTagName }
					className="moon-accordion-item__title"
					value={ title }
				/>
			</summary>
			<div { ...innerBlocksProps } />
		</details>
	);
}
