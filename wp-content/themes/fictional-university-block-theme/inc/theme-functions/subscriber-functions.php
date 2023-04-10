<?php
// Redirect subscriber accounts out of admin and onto homepage
add_action('admin_init', 'redirectSubsToFrontend');

function redirectSubsToFrontend() {
	$ourCurrentUser = wp_get_current_user();

	if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
		wp_redirect(site_url('/'));
		exit;
	}
}

add_action('wp_loaded', 'noSubsAdminBar');

function noSubsAdminBar() {
	$ourCurrentUser = wp_get_current_user();

	if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
		show_admin_bar(false);
	}
}