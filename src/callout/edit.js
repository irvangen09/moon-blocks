import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PlainText,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import { CalloutIcon } from './icons';

// Called at render time so translations are loaded.
function getVariants() {
	return [
		{ value: 'info', label: __( 'Info', 'moon-blocks' ) },
		{ value: 'tips', label: __( 'Tips', 'moon-blocks' ) },
		{ value: 'warning', label: __( 'Warning', 'moon-blocks' ) },
		{ value: 'important', label: __( 'Important', 'moon-blocks' ) },
	];
}

function getVariantName( value ) {
	const match = getVariants().find( ( variant ) => variant.value === value );

	return match ? match.label : '';
}

export default function Edit( { attributes, setAttributes } ) {
	const { variant, content, label } = attributes;
	const blockProps = useBlockProps( {
		className: `moon-callout moon-callout--${ variant }`,
	} );

	// New blocks have no label and empty content (an empty RichTextData, not
	// undefined). Requiring empty content keeps a cleared label cleared when
	// a saved block is reloaded, since an empty label is not stored.
	const isContentEmpty = ! content?.toString();

	useEffect( () => {
		if ( undefined === label && isContentEmpty ) {
			setAttributes( { label: getVariantName( variant ) } );
		}
	}, [ label, isContentEmpty, variant, setAttributes ] );

	function onVariantChange( next ) {
		const isDefaultLabel = label === getVariantName( variant );

		setAttributes( {
			variant: next,
			label: isDefaultLabel ? getVariantName( next ) : label,
		} );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'moon-blocks' ) }>
					<SelectControl
						label={ __( 'Variant', 'moon-blocks' ) }
						value={ variant }
						options={ getVariants() }
						onChange={ onVariantChange }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<CalloutIcon
					variant={ variant }
					className="moon-callout__icon"
				/>
				<div className="moon-callout__body">
					<PlainText
						className="moon-callout__label"
						value={ label || '' }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
						onKeyDown={ ( event ) => {
							if ( 'Enter' === event.key ) {
								event.preventDefault();
							}
						} }
						placeholder={ __( 'Label (optional)', 'moon-blocks' ) }
						aria-label={ __( 'Label', 'moon-blocks' ) }
					/>
					<RichText
						tagName="div"
						className="moon-callout__text"
						value={ content }
						onChange={ ( value ) =>
							setAttributes( { content: value } )
						}
						placeholder={ __( 'Write your note…', 'moon-blocks' ) }
					/>
				</div>
			</div>
		</>
	);
}
