import { registerBlockType } from '@wordpress/blocks';
registerBlockType('ourblocktheme/header', {
	title: 'Header',
	edit: EditComponent,
	save: () => null,
});

function EditComponent() {
	return <div className="static-block">This is a "Header" placeholder.</div>;
}
