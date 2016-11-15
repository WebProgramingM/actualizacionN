<?php 

	require 'twig.php';
	
	$sliders[0] = array(
		'img' => 'img/sliders/slider1.jpg',
		'imgmobile' => 'img/sliders/slidermovil1.jpg'
	);

	$params= array(
		'titulo' => "Hola Mundo",
		'sliders' => $sliders,
		'gallery' => array(
			'img/gallery/00.jpg',
			'img/gallery/01.jpg',
			'img/gallery/02.jpg',
			'img/gallery/03.jpg',
			'img/gallery/04.jpg',
			'img/gallery/tipi.jpg',
			'img/gallery/05.jpg',
			'img/gallery/06.jpg',
			'img/gallery/07.jpg',
			'img/gallery/08.jpg',
			'img/gallery/09.jpg',
			'img/gallery/10.jpg',
			'img/gallery/11.jpg',
			'img/gallery/12.jpg',
			'img/gallery/13.jpg',
			'img/gallery/14.jpg'
		)
	);

	echo $twig->render('principal.twig', $params);
 ?>
 