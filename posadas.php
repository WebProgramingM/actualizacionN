<?php 

	require 'twig.php';

	$params= array(
		'titulo' => "Hola Mundo",
		'posada' => true
	);

	echo $twig->render('posadas.twig', $params);
 ?>
 