import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { link } from '@wordpress/icons';
import {
	RichText,
	BlockControls,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
	getColorObjectByColorValue,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	PanelRow,
	ColorPalette,
	Popover,
	Button,
} from '@wordpress/components';
import { themeColors } from '../src/Utilities';

registerBlockType('ourblocktheme/button', {
	title: 'Button',
	attributes: {
		text: {
			type: 'string',
		},
		size: {
			type: 'string',
			defaut: 'large',
		},
		colorName: { type: 'string', default: 'blue' },
		linkObject: { type: 'object', default: { url: '' } },
	},
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent({ attributes, setAttributes }) {
	const [showLink, setShowLink] = useState(false);
	function handleTextChange(value) {
		setAttributes({ text: value });
	}
	function handleLinkChange(newLink) {
		setAttributes({ linkObject: newLink });
	}

	const currentColor = themeColors.filter(
		(color) => color.name == attributes.colorName,
	)[0].color;
	function handleColorChange(hexCode) {
		const { name } = getColorObjectByColorValue(themeColors, hexCode);
		setAttributes({ colorName: name });
	}
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						onClick={() => {
							setShowLink((prev) => !prev);
						}}
						icon={link}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={attributes.size === 'small'}
						onClick={() => setAttributes({ size: 'small' })}>
						Small
					</ToolbarButton>
					<ToolbarButton
						isPressed={attributes.size === 'medium'}
						onClick={() => setAttributes({ size: 'medium' })}>
						Medium
					</ToolbarButton>
					<ToolbarButton
						isPressed={attributes.size === 'large'}
						onClick={() => setAttributes({ size: 'large' })}>
						Large
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Color" initialOpen={true}>
					<PanelRow>
						<ColorPalette
							colors={themeColors}
							value={currentColor}
							onChange={handleColorChange}
							disableCustomColors={true}
							clearable={false}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<RichText
				value={attributes.text}
				onChange={handleTextChange}
				tagName="a"
				className={`btn btn--${attributes.size} btn--${attributes.colorName}`}
				allowedFormats={[]}
			/>
			{showLink && (
				<Popover
					position="middle center"
					onFocusOutside={() => setShowLink(false)}>
					<LinkControl
						settings={[]}
						value={attributes.linkObject}
						onChange={handleLinkChange}
					/>
					<Button
						variant="primary"
						onClick={() => setShowLink(false)}>
						Confirm Link
					</Button>
				</Popover>
			)}
		</>
	);
}
function SaveComponent({ attributes }) {
	return (
		<a
			href={attributes.linkObject.url}
			className={`btn btn--${attributes.size} btn--${attributes.colorName}`}>
			{attributes.text}
		</a>
	);
}
