<?php

if (!isset($attributes['imgUrl'])) {
	$background_image_url = get_theme_file_uri('/images/bus.jpg');
} else {
	$background_image_url =
		$attributes['imgUrl'];
}
?>
<div class="hero-slider__slide" style="background-image: url(<?php echo $background_image_url ?>);">
	<div class="hero-slider__interior container">
		<div class="hero-slider__overlay t-center">
			<?php echo $content; ?>
		</div>
	</div>
</div>