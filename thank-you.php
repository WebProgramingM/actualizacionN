<?php

require 'twig.php';

$params = array(
	'titulo' => "Thanks",
	'sliders' => $sliders,
	'posada' => true,
);

echo $twig->render('posadas.twig', $params);
?>