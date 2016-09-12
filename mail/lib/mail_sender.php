<?php
//error_reporting(-1);
//ini_set('display_errors', 'On');

// Set default timezone as some servers do not have this set.
if(isset($timeZone) && $timeZone != ""){
	date_default_timezone_set($timeZone);
}
else{
	date_default_timezone_set("UTC");
}

// Require the Swift Mailer library
require_once 'swift_required.php';

$messageText = "";

if($emailMethod == 'phpmail'){ 
	$transport = Swift_MailTransport::newInstance(); 
}elseif($emailMethod == 'smtp'){
    $transport = Swift_SmtpTransport::newInstance( $outgoingServerAddress, $outgoingServerPort, $outgoingServerSecurity )
    ->setUsername( $sendingAccountUsername )     
    ->setPassword( $sendingAccountPassword );
}

$mailer = Swift_Mailer::newInstance($transport);

// Creating the message text using fields sent through POST
foreach ($_POST as $key => $value)
{
	// Sets of checkboxes will be shown as comma-separated values as they are passed in as an array.
	if(is_array($value)){
		$value = implode(', ' , $value);
	}
	$messageText .= ucfirst($key).": ".$value."\n\n";
}

if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['date']) && isset($_POST['hour']) && isset($_POST['guests']) ){
	$fromArray = array($_POST['name'] => $_POST['phone']) => $_POST['date']) => $_POST['hour']) => $_POST['guests']);
}else{ $fromArray = array($sendingAccountUsername => $websiteName); }

$message = Swift_Message::newInstance($emailSubject)
  ->setFrom($fromArray)
  ->setTo(array($recipientEmail => $recipientName))->setBody($messageText);

// Send the message or catch an error if it occurs.
try{
	echo($mailer->send($message));
}
catch(Exception $e){
	echo($e->getMessage());
}
exit;
?>