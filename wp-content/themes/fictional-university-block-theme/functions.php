<?php

require get_theme_file_path('/inc/theme-functions.php');
require get_theme_file_path('/inc/class-theme-blocks.php');


new JSXBlock('banner', true, array('fallback_image' => get_theme_file_uri('/images/library-hero.jpg')));
new JSXBlock('headline');
new JSXBlock('button');
new JSXBlock('slideshow', true);
new JSXBlock('slide', true);

new StaticBlock('eventsandblogs');
new StaticBlock('header');
new StaticBlock('footer');