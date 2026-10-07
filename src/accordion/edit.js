import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'moon-blocks/accordion-item' ];

const TEMPLATE = [
	[ 'moon-blocks/accordion-item' ],
	[ 'moon-blocks/accordion-item' ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { openOnDesktop } = attributes;

	const blockProps = useBlockProps( {
		className: openOnDesktop
			? 'moon-accordion moon-accordion--open-desktop'
			: 'moon-accordion',
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'moon-blocks' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Open items on desktop', 'moon-blocks' ) }
						help={ __(
							'Items start open on wide screens and collapsed on mobile. Visitors can still open and close each item.',
							'moon-blocks'
						) }
						checked={ openOnDesktop }
						onChange={ ( value ) =>
							setAttributes( { openOnDesktop: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
