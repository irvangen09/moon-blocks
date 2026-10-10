import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const CONTENT_TEMPLATE = [ [ 'core/paragraph' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { label } = attributes;

	const blockProps = useBlockProps( { className: 'moon-tabs-item' } );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'moon-tabs-item__content' },
		{ template: CONTENT_TEMPLATE }
	);

	return (
		<div { ...blockProps }>
			<RichText
				tagName="div"
				className="moon-tabs-item__label"
				placeholder={ __( 'Tab label…', 'moon-blocks' ) }
				value={ label }
				onChange={ ( value ) => setAttributes( { label: value } ) }
				allowedFormats={ [] }
			/>

			<div { ...innerBlocksProps } />
		</div>
	);
}
