<?php

require 'twig.php';

$params = array(
	'titulo' => "Thanks",
	'sliders' => $sliders,
);

echo $twig->render('posadas.twig', $params);
?>