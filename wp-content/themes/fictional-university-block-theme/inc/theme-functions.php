<?php
require get_theme_file_path('/inc/theme-functions/rest-api/like-route.php');
require get_theme_file_path('/inc/theme-functions/rest-api/search-route.php');
require get_theme_file_path('/inc/theme-functions/rest-api/custom-routes.php');

function university_files() {
	wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyDin3iGCdZ7RPomFLyb2yqFERhs55dmfTI', NULL, '1.0', true);
	wp_enqueue_script('main-university-js', get_theme_file_uri('/dist/global.js'), array('jquery'), '1.0', true);
	wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	wp_enqueue_style('university_main_styles', get_theme_file_uri('/dist/style-global.css'));
	// wp_enqueue_style('university_extra_styles', get_theme_file_uri('/dist/global.css'));

	wp_localize_script('main-university-js', 'universityData', array(
		'root_url' => get_site_url(),
		'nonce' => wp_create_nonce('wp_rest')
	));
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features() {
	$theme_supports = array('title-tag', 'post-thumbnails', 'editor-styles');
	foreach ($theme_supports as $feature) {
		add_theme_support($feature);
	}
	add_image_size('professorLandscape', 400, 260, true);
	add_image_size('professorPortrait', 480, 650, true);
	add_image_size('pageBanner', 1500, 350, true);
	add_editor_style(array('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i', 'dist/style-global.css'));
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query) {
	if (!is_admin() and is_post_type_archive('campus') and $query->is_main_query()) {
		$query->set('posts_per_page', -1);
	}

	if (!is_admin() and is_post_type_archive('program') and $query->is_main_query()) {
		$query->set('orderby', 'title');
		$query->set('order', 'ASC');
		$query->set('posts_per_page', -1);
	}

	if (!is_admin() and is_post_type_archive('event') and $query->is_main_query()) {
		$today = date('Ymd');
		$query->set('meta_key', 'event_date');
		$query->set('orderby', 'meta_value_num');
		$query->set('order', 'ASC');
		$query->set('meta_query', array(
			array(
				'key' => 'event_date',
				'compare' => '>=',
				'value' => $today,
				'type' => 'numeric'
			)
		));
	}
}

add_action('pre_get_posts', 'university_adjust_queries');


// Force note posts to be private
add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2);

function makeNotePrivate($data, $postarr) {
	if ($data['post_type'] == 'note') {
		if (count_user_posts(get_current_user_id(), 'note') > 4 and !$postarr['ID']) {
			die("You have reached your note limit.");
		}

		$data['post_content'] = sanitize_textarea_field($data['post_content']);
		$data['post_title'] = sanitize_text_field($data['post_title']);
	}

	if ($data['post_type'] == 'note' and $data['post_status'] != 'trash') {
		$data['post_status'] = "private";
	}

	return $data;
}



// Customize Login Screen
add_filter('login_headerurl', 'ourHeaderUrl');

function ourHeaderUrl() {
	return esc_url(site_url('/'));
}

add_action('login_enqueue_scripts', 'ourLoginCSS');

function ourLoginCSS() {
	wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
	wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
}

add_filter('login_headertitle', 'ourLoginTitle');

function ourLoginTitle() {
	return get_bloginfo('name');
}