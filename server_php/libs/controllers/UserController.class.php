<?php

class UsersController extends Controller
{
	public static function Init()
	{
        self::$components = array();
        self::$models = array(
			'Users'
		);
        self::$methods_params = array(
			'LogIn' => array('login', 'password'),
			'LogOut' => array()
        );
    }

	public static function LogIn()
	{
		$login = self::$data['login'];
		$password = self::$data['password'];
		
		$userId = UsersModel::GetUserId($login, $password);
		if (!$userId)
			return "Users not found";

		$_SESSION['user_id'] = $userId;
		return self::$is_request_ok = true;
	}

	public static function LogOut()
	{
		session_unset();
		return self::$is_request_ok = true;
	}
}
?>
