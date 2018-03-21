<?php
require_once('com/config.php');
?>
<!DOCTYPE html>
<html lang="en"> 
	<head>
		<meta charset="utf-8">
		<title><?php print $site_name . ' | Free encryption site Bang Dev'  ?></title>
		<meta name="description" content="<?php print $site_description ?>">
		<meta name="keywords" content="<?php print $site_keywords ?>">
		<link rel="stylesheet" href="style/layout.css">
	</head>
	<body>
		<div id="container">
			<div id="header">
				<a href="/"><img src="style/images/header.jpg" /></a>
			</div>
			<div id="content">
				<div class="text">
					Welcome to <b>Vipc0de Encryption</b>. Our site offers you a free encryption service,with over <b>30</b> encrypton altghoritms, like hex, binary, base64, Whirpool,md5 ,SHA, ROT13, and so many others.Just click on one the options down below.Stay safe!
				</div>
			<div id="services">
			<?php require_once('com/services.php'); ?>
			</div>
			<br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br />
			<br /><br /><br /><br /><br />
			<?php require_once('com/footer.php'); ?>
	</body>
</html>