<?php

require 'twig.php';

$params = array(
	'titulo' => "Posadas",
	'sliders' => $sliders,
);

echo $twig->render('posadas.twig', $params);
?>
