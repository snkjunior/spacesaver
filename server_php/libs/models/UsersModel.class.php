<?php

class UsersModel {
	/**
	 * GET
	 *
	 * IsUserExist
	 *   This method search user by login and return true, if user found,
	 * else return false
	 *
	 * @param string $login
	 * @return bool
	 */
    public static function IsUserExist($login) {
		$sql = "
            SELECT `user_id`
            FROM `users`
            WHERE `login` = ?
            LIMIT 1
        ";
		Database::Query($sql, array($login));
		if(Database::GetRows() == 0) {
			return false;
		}
		return true;
    }

	/**
	 * GET
	 *
	 * GetUserId
	 *   This method search user by login and password. If user was found -
	 * return user id, else return -1
	 *
	 * @param string $login
	 * @param string $password
	 * @return int
	 */
    public static function GetUserId($login, $password) {
		$sql = "
			SELECT `user_id`
			FROM `users`
			WHERE `login` = ?
				AND `password` = ?
			LIMIT 1
		";
		$result = Database::Query($sql, array($login, $password));
		if($result) {
			return $result['user_id'];
		}
		return false;
    }

	/**
	 * GET
	 *
	 * GetUserInfoById
	 *   This method search user by id and return next info:
	 *     email
	 *     character_id
	 *
	 * @param int $userId
	 * @return array
	 */
    public static function GetUserInfoById($userId) {
		$sql = "
			SELECT `email`
			FROM `users`
			WHERE `user_id` = ?
			LIMIT 1
		";
        return Database::Query($sql, array($userId));
    }

    /**
	 * ADD
	 *
	 * CreateNewUser
	 *   This method create new user's login info with no character_id
	 *
	 * @param string $login
	 * @param string $password
	 * @param string $email
	 * @return int new user id
	 */
    public static function CreateNewUser($login, $password, $email) {
        $sql = "
			INSERT INTO `users`
			SET
				`login` = ?,
				`password` = ?,
				`email` = ?				
		";
		if(Database::Query($sql, array($login, $password, $email))) {
			return Database::GetLastInsertId();
		}
		return false;
    }   
}
?>
