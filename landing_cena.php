<?php

require 'twig.php';

$params = array(
	'titulo' => "Posadas",
	'posada' => true,
);

echo $twig->render('posadas.twig', $params);
?>