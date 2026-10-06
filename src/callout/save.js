import { RichText, useBlockProps } from '@wordpress/block-editor';

import { CalloutIcon } from './icons';

export default function save( { attributes } ) {
	const { variant, content, label } = attributes;
	const blockProps = useBlockProps.save( {
		className: `moon-callout moon-callout--${ variant }`,
		role: 'note',
	} );

	return (
		<div { ...blockProps }>
			<CalloutIcon variant={ variant } className="moon-callout__icon" />
			<div className="moon-callout__body">
				{ label && <p className="moon-callout__label">{ label }</p> }
				<RichText.Content
					tagName="div"
					className="moon-callout__text"
					value={ content }
				/>
			</div>
		</div>
	);
}
