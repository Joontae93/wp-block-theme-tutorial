import { registerBlockType } from '@wordpress/blocks';
import { link } from '@wordpress/icons';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

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
		color: {},
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
						onClick={() => {}}
						icon={link}></ToolbarButton>
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
			<RichText
				value={attributes.text}
				onChange={handleTextChange}
				tagName="a"
				className={`btn btn--${attributes.size} btn--blue`}
				allowedFormats={[]}
			/>
		</>
	);
}
function SaveComponent({ attributes }) {
	return (
		<a href="#" className={`btn btn--${attributes.size} btn--blue`}>
			{attributes.text}
		</a>
	);
}
