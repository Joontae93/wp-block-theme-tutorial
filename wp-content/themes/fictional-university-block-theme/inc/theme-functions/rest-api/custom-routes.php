<?php
add_action('rest_api_init', 'university_custom_rest');
function university_custom_rest() {
	register_rest_field('post', 'authorName', array(
		'get_callback' => function () {
			return get_the_author();
		}
	));

	register_rest_field('note', 'userNoteCount', array(
		'get_callback' => function () {
			return count_user_posts(get_current_user_id(), 'note');
		}
	));
}