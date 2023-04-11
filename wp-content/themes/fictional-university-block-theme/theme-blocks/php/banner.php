<?php

if (!isset($attributes['imgUrl'])) {
	$background_image_url = get_theme_file_uri('/images/library-hero.jpg');
} else {
	$background_image_url =
		$attributes['imgUrl'];
}
?>
<section class="page-banner">
	<div class="page-banner__bg-image" style="background-image: url(' <?php echo $background_image_url ?>')">
	</div>
	<div class="page-banner__content container t-center c-white">
		<?php echo $content; ?>
	</div>
</section>