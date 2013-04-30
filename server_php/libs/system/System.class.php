<?php
class System {
    private static $stage = 'no';

    private static $controller;
    private static $function;
    private static $params;

    private static $result;

    public static function Run()
	{
        // Инициализация системы
        self::Init();
        // Обработка запроса
        self::ParseRequest();
        // Инициализация контроллера
        self::InitController();
        // Подключение моделей, которые использует контроллер
        self::InitControllerModels();
        // Подключение компонентов, которые использует контроллер
        self::InitComponents();
        // Проверка существования функции
        self::CheckFunction();
        // Проверка параметров функции
        self::CheckParams();
		// Залогинен ли пользователь
		self::SetPlayer();
		// Выполнение функции
		self::ProcessRequest();
		// Формируем и выводим ответ
		self::FormResult();
		// Деструктор
		self::Destruct();
    }

    private static function Init()
	{
		// Старт сессии
		session_start();

        // Подключение конфиг файла
        self::$stage = "Init config";
        include("Config.class.php");

        // Подключение и инициализация базы данных
        include("Database.class.php");
        Database::Init();

		// Подключение базового контроллера
        include('libs/controllers/Controller.class.php');
		
		// Подключение базового компонента
		include('libs/components/Component.class.php');
    }

    private static function ParseRequest()
	{
        self::$stage = "Parse request";
		
        $url_info = explode("/", $_SERVER['REDIRECT_URL']);

        // Проверка имени класса контроллера
		if (isset($url_info[1]))
		{
			if (empty($url_info[1]))
			{
				self::ProcessError('Empty class name');
			}
		}
		else
		{
			self::ProcessError('Empty class name');
		}
		self::$controller = $url_info[1];

        // Проверка имени исполняемой функции класса
		if (isset($url_info[2]))
		{
			if (empty($url_info[2]))
			{
	            self::ProcessError('Empty function name');
			}
		}
		else
		{
			self::ProcessError('Empty function name');
		}
        self::$function = $url_info[2];

        // Сохранение параметров
        self::$params = $_GET;
    }

    private static function InitController()
	{
        self::$stage = "Init controller " . self::$controller;        
        // Подключение исполняемого контроллера
        require_once("libs/controllers/" . self::$controller . "Controller.class.php");
        call_user_func(array(self::$controller.'Controller', 'Init'));
    }

    private static function InitControllerModels()
	{
        self::$stage = "Init class models";
        $models = call_user_func(array(self::$controller.'Controller', 'GetModels'));
        if (!empty($models))
		{
            foreach ($models as $model)
			{
                self::$stage = "Init model " . $model;
                require_once('libs/models/' . $model . 'Model.class.php');
            }
        }
    }

    private static function InitComponents()
	{
        self::$stage = "Init class components";
        $components = call_user_func(array(self::$controller.'Controller', 'GetComponents'));
        if (!empty($components))
		{
            foreach ($components as $component)
			{
                self::$stage = "Init model " . $component;
                require_once('libs/components/' . $component . '.class.php');
				call_user_func(array($component, 'Init'));
				self::InitComponentModels($component);
            }
        }
    }

	private static function InitComponentModels($component)
	{
		self::$stage = "Init class models";
        $models = call_user_func(array($component, 'GetModels'));
        if (!empty($models))
		{
            foreach ($models as $model)
			{
                self::$stage = "Init model " . $model;
                require_once('libs/models/' . $model . 'Model.class.php');
            }
        }
	}

    private static function CheckFunction()
	{
        // Проверка существует ли функция
        self::$stage = 'Check function';
        if(!method_exists(self::$controller.'Controller', self::$function))
		{
            self::ProcessError('Function does not exists');
		}
    }

    private static function CheckParams()
	{
        self::$stage = 'Check params';
        if (!call_user_func(array(self::$controller.'Controller', 'ValidateAndSetParams'), self::$params, self::$function))
		{
            self::ProcessError('Some params were not found');
		}
    }

	private static function SetPlayer()
	{
		if(!empty($_SESSION['user_id']))
		{
			Config::$userId = $_SESSION['user_id'];
		}
		elseif(self::$controller != 'User' || self::$function != 'LogIn')
		{
			self::ProcessError('Login to game first, please');
		}
	}

    private static function ProcessRequest()
	{
        // Выполенение запроса
        self::$stage = 'Process request';
        self::$result = call_user_func(array(self::$controller.'Controller', self::$function), self::$params);
    }

    private static function FormResult($isSystemError = false) {
		Header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); //Дата в прошлом 
		Header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1 
		Header("Pragma: no-cache"); // HTTP/1.1 
		Header("Last-Modified: ".gmdate("D, d M Y H:i:s")."GMT");
			
        $response = array(
            'Controller' => self::$controller,
            'Method' => self::$function
        );

        if(!$isSystemError) {
            if(call_user_func(array(self::$controller.'Controller', "IsRequestOk"))) {
                $response['Status'] = 'Ok';
                $response['Info'] = self::$result;
            }
            else {
                $response['Status'] = 'Error';
                $response['Info'] = array(
                    'Stage' => self::$stage,
                    'ErrorDescription' => self::$result
                );
            }
        }
        else {
            $response['Status'] = 'Error';
            $response['Info'] = self::$result;
        }

        if(Config::$response_type == 'array')
            print_r($response);
        elseif(Config::$response_type == 'json')
            echo json_encode($response);
		elseif(Config::$response_type == 'params')
			echo http_build_query($response);		
        exit;
    }

    public static function ErrorHandler() {
        self::ProcessError();
    }

    private static function ProcessError($message = '') {
        self::$result = array(
            "Stage" => self::$stage,
            "ErrorDescription" => $message
        );
        self::FormResult(true);
    }

	private static function Destruct()
	{
		session_write_close();
	}
}
?>
