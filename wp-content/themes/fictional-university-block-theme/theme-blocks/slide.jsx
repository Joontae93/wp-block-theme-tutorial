import { Button, PanelBody, PanelRow } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType('ourblocktheme/slide', {
	title: 'Slide',
	supports: {
		align: ['full'],
	},
	attributes: {
		align: { type: 'string', default: 'full' },
		imgID: { type: 'number' },
		imgUrl: { type: 'string', default: banner.fallback_image },
	},
	edit: EditComponent,
	save: SaveComponent,
});

function EditComponent({ setAttributes, attributes }) {
	useEffect(() => {
		if (attributes.imgID) {
			async function getImageAttributes() {
				const response = await apiFetch({
					path: `/wp/v2/media/${attributes.imgID}`,
					method: 'GET',
				});
				setAttributes({
					imgUrl: response.media_details.sizes.pageBanner.source_url,
				});
			}
			getImageAttributes();
		}
	}, [attributes.imgID]);
	function onFileSelect(img) {
		setAttributes({ imgID: img.id });
	}
	return (
		<>
			<InspectorControls>
				<PanelBody title="Background" initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={attributes.imgID}
								render={({ open }) => (
									<Button onClick={open}>Choose Image</Button>
								)}
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div
				className="hero-slider__slide"
				style={{
					backgroundImage: `url('${attributes.imgUrl}')`,
				}}></div>
			<div className="hero-slider__interior container">
				<div className="hero-slider__overlay t-center">
					<InnerBlocks
						allowedBlocks={[
							'ourblocktheme/headline',
							'ourblocktheme/button',
						]}
					/>
				</div>
			</div>
		</>
	);
}
function SaveComponent() {
	return <InnerBlocks.Content />;
}
