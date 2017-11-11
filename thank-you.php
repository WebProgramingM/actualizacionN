<?php

require 'twig.php';

$params = array(
	'titulo' => "Hola Mundo",
	'sliders' => $sliders,
);

echo $twig->render('posadas.twig', $params);
?>