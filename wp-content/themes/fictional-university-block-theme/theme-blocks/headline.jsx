import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

registerBlockType('ourblocktheme/headline', {
	title: 'Headline',
	attributes: {
		text: {
			type: 'string',
		},
		size: {
			type: 'string',
			defaut: 'large',
		},
	},
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent({ attributes, setAttributes }) {
	function handleTextChange(value) {
		setAttributes({ text: value });
	}
	return (
		<>
			<BlockControls>
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
			<RichText
				value={attributes.text}
				onChange={handleTextChange}
				tagName="h1"
				className={`headline headline--${attributes.size}`}
				allowedFormats={['core/bold']}
			/>
		</>
	);
}
function SaveComponent({ attributes }) {
	function setTagName() {
		switch (attributes.size) {
			case 'large':
				return 'h1';
			case 'medium':
				return 'h2';
			case 'small':
				return 'h3';
		}
	}
	return (
		<RichText.Content
			value={attributes.text}
			className={`headline headline--${attributes.size}`}
			tagName={setTagName()}
		/>
	);
}
