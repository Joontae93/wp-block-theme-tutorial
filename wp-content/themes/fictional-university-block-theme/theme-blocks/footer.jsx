import { registerBlockType } from '@wordpress/blocks';
registerBlockType('ourblocktheme/footer', {
	title: 'Footer',
	edit: EditComponent,
	save: () => null,
});

function EditComponent() {
	return <div className="static-block">This is a "Footer" placeholder.</div>;
}
