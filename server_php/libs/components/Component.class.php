<?php

class Component {
	protected static $models = array();

	public static function GetModels() {
        return self::$models;
    }
}

?>
