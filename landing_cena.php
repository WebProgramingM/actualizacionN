<?php

require 'twig.php';

$params = array(
	'titulo' => "cena",
	'posada' => true,
);

echo $twig->render('posadas.twig', $params);
?>