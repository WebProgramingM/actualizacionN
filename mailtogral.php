<?php 
	
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$response = array();
	// $date = $_POST['date'];
	// $people = $_POST['people'];
	// $time = $_POST['time'];


	$to = "oscar@socialastronauts.com";
	$subject = "CONTACT MESSAGE FROM WEB";

	$msg = "Name: ".$name."\nEmail: ".$email."\nMessage: ".$message;
	if (mail($to, $subject, $msg)) {
		$response['success'] = true;
        $response['message'] = "Send Correct";
	}else{
        $response['success'] = false;
        $response['message'] = "There it was a problem sending your message, please try again.";

	}
    echo json_encode($response);
?>