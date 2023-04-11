<?php

/** Class for Blocks
 * 
 * @since v1.0.0
 * @author KJ Roelke
 */
abstract class Block {
	protected $block_name = '';
	public function __construct(string $block_name) {
		$this->block_name = $block_name;
		add_action('init', [$this, 'on_init']);
	}
	public function on_init() {
	}
	public function block_render_callback($attributes, $content) {
		ob_start();
		require get_theme_file_path("/theme-blocks/php/{$this->block_name}.php");
		return ob_get_clean();
	}
}

class StaticBlock extends Block {
	public function __construct(string $block_name) {
		parent::__construct($block_name);
	}
	public function on_init() {
		wp_register_script($this->block_name, get_stylesheet_directory_uri() . "/dist/{$this->block_name}.js", array('wp-blocks', 'wp-editor'), false, true);
		register_block_type("ourblocktheme/{$this->block_name}", array(
			'editor_script'   => $this->block_name,
			'render_callback' => [$this, 'block_render_callback']
		));
	}
}

class JSXBlock extends Block {
	private $use_render_callback = null;
	private $fallback_image = null;
	public function __construct(string $block_name, bool $use_render_callback = null, array $fallback_image = null) {
		parent::__construct($block_name);
		$this->use_render_callback = $use_render_callback;
		$this->fallback_image = $fallback_image;
	}
	public function on_init() {
		wp_register_script($this->block_name, get_stylesheet_directory_uri() . "/dist/{$this->block_name}.js", array('wp-blocks', 'wp-editor'), false, true);

		if (isset($this->fallback_image)) {
			wp_localize_script($this->block_name, $this->block_name, $this->fallback_image);
		}
		$args = array(
			'editor_script' => $this->block_name
		);
		if (true === $this->use_render_callback) {
			$args['render_callback'] = [$this, 'block_render_callback'];
		}
		register_block_type("ourblocktheme/{$this->block_name}", $args);
	}
}