<?php

class Config {
    // Ид пользователя
	public static $userType = 'none';
    public static $userId = 0;
	
    // Информация для подключения к базе данных
    public static $db_host = 'localhost';
    public static $db_user = 'root';
    public static $db_pass = '';
    public static $db_name = 'spacesaver';

    // Формат ответа: json, array, params, object
    public static $response_type = 'array';
}

?>
