<?php 
require_once 'captcha/ReCaptcha.php';
require_once 'captcha/RequestMethod.php';
require_once 'captcha/RequestParameters.php';
require_once 'captcha/Response.php';
require_once 'captcha/RequestMethod/Post.php';
require_once 'captcha/RequestMethod/Socket.php';
require_once 'captcha/RequestMethod/SocketPost.php';
	$response = array();
	$recaptcha = new \ReCaptcha\ReCaptcha("6Le7gBAUAAAAAH5H-fIiighiXwNHbZ3CBQwa5DfZ");
    $respuesta = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
    if($respuesta->isSuccess()){
		if(!isset($_POST['name']) ||
	 
	        !isset($_POST['email']) ||
	 
	        !isset($_POST['message'])) {
	 
	        $response['success'] = false;
	        $response['message'] = "There it was a problem sending your message, please try again.";       
	 
	    } else{
			$name = $_POST['name'];
			$email = $_POST['email'];
			$message = $_POST['message'];
			// $date = $_POST['date'];
			// $people = $_POST['people'];
			// $time = $_POST['time'];


			$to = "contactoweb@nomadscancun.com";
			$subject = "CONTACT MESSAGE FROM WEB - NOMADS CANCUN";

			$msg = "Name: ".$name."\nEmail: ".$email."\nMessage: ".$message;
			if (mail($to, $subject, $msg)) {
				$response['success'] = true;
		        $response['message'] = "Send Correct";
			}else{
		        $response['success'] = false;
		        $response['message'] = "There it was a problem sending your message, please try again.";

			}
	    }
    }else{
        $response['success'] = false;
		$response['message'] = "There it was a problem sending your message, please try again.";
    }
    echo json_encode($response);
?>