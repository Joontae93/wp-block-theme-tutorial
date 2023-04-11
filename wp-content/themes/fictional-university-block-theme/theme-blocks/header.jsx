import { registerBlockType } from '@wordpress/blocks';
// import '../src/styles/modules/events-and-blogs.scss';
registerBlockType('ourblocktheme/header', {
	title: 'Header',
	edit: EditComponent,
	save: () => null,
});

function EditComponent() {
	return <div className="static-block">This is a "Header" placeholder.</div>;
}
