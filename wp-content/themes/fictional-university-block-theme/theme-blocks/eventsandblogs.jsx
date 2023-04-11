import { registerBlockType } from '@wordpress/blocks';
registerBlockType('ourblocktheme/eventsandblogs', {
	title: 'Events and Blogs',
	edit: EditComponent,
	save: () => null,
});

function EditComponent() {
	return (
		<div className="static-block">
			This is an "Events & Blogs" placeholder.
		</div>
	);
}
