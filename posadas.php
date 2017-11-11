<?php

require 'twig.php';

$params = array(
	'titulo' => "Posadas",
	'posadas' => true,
);

echo $twig->render('posadas.twig', $params);
?>
