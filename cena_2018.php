<?php

require 'twig.php';

$params = array(
	'titulo' => "cena",
	'posada' => true,
	'keywords' => 'Lugares para pasar año nuevo en cancún,Lugares para pasar año nuevo en cancún 2018,Año nuevo cancún 2018,Cenas año nuevo 2018,Lugares para pasar año nuevo en cancún,Año Nuevo 2018,Cena año nuevo,Cena fin de año,Cena año nuevo,Cena fin de año,Paquetes cena año nuevo,Paquetes cena cancún fin de año,Paquetes cena cancún,Cena cancún.'
);

echo $twig->render('posadas.twig', $params);
?>