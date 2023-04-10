<?php

/** Class for Blocks
 * 
 * @since v1.0.0
 * @author KJ Roelke
 */
class JSXBlock {
	private $name = '';
	function __construct($name) {
		$this->name = $name;
		add_action('init', [$this, 'on_init']);
	}
	function on_init() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/dist/{$this->name}.js", array('wp-blocks', 'wp-editor'), false, true);
		register_block_type("ourblocktheme/{$this->name}", array(
			'editor_script' => $this->name
		));
	}
}