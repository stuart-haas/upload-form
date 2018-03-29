<?php

$allowed = array('png', 'jpg', 'gif','zip');

if(isset($_FILES['upload']) && $_FILES['upload']['error'] == 0){

	$extension = pathinfo($_FILES['upload']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	if(move_uploaded_file($_FILES['upload']['tmp_name'], '../uploads/'.$_FILES['upload']['name'])){
		echo '{"status":"success"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;