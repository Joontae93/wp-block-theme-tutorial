<?php
function universityMapKey($api) {
	$api['key'] = 'yourKeyGoesHere';
	return $api;
}

add_filter('acf/fields/google_map/api', 'universityMapKey');