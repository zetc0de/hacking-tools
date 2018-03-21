<?php
require_once('com/config.php');
?>
<!DOCTYPE html>
<html lang="en"> 
	<head>
		<?php 
		if($_GET['algorithm'] == 'hex' || $_GET['algorithm'] == 'binary' || $_GET['algorithm'] == 'base64' || $_GET['algorithm'] == 'md5' || $_GET['algorithm'] == 'sha1' || $_GET['algorithm'] == 'rot13' || $_GET['algorithm'] == 'htmlentities'|| $_GET['algorithm'] == 'urlencode' || $_GET['algorithm'] == 'md4' || $_GET['algorithm'] == 'des' || $_GET['algorithm'] == 'sha256' || $_GET['algorithm'] == 'sha512' || $_GET['algorithm'] == 'md2' || $_GET['algorithm'] == 'sha384' || $_GET['algorithm'] == 'ripemd128' || $_GET['algorithm'] == 'ripemd160' || $_GET['algorithm'] == 'ripemd256' || $_GET['algorithm'] == 'ripemd320' || $_GET['algorithm'] == 'whirlpool' || $_GET['algorithm'] == 'gost' || $_GET['algorithm'] == 'snefru' || $_GET['algorithm'] == 'snefru256' || $_GET['algorithm'] == 'adler32' || $_GET['algorithm'] == 'crc32' || $_GET['algorithm'] == 'crc32b' || $_GET['algorithm'] == 'esab46' || $_GET['algorithm'] == 'uppercase' || $_GET['algorithm'] == 'lowercase' || $_GET['algorithm'] == 'morse' || $_GET['algorithm'] == 'reverse'){
			$ok = 1;
			$title = $site_name  . ' | Convert ' . $_GET['algorithm'] . ' online';
		}
		else{
			$ok = 0;
			$title = 'Error occured';
		}

		?>
		<meta charset="utf-8">
		<title><?php print $title ?></title>
		<meta name="description" content="<?php print $site_description ?>">
		<meta name="keywords" content="<?php print $site_keywords ?>">
		<link rel="stylesheet" href="style/layout.css">
		<script type="text/javascript" src="com/js/jquery.min.js"></script>
		<script type="text/javascript" src="com/js/jquery.zclip.js.js"></script>
		<script type="text/javascript" src="com/js/enc_functions.js" ></script>
		<script>
		$(document).ready(function(){
		  $('#copy').zclip({
		        path:'com/js/ZeroClipboard.swf',
		        copy:function(){return $('#output').val();}
		    });
		});
		function reset(){
			document.getElementById("input").value = '';
			document.getElementById("output").value = '';
		}
		function SelectAll(id){
		    document.getElementById(id).focus();
		    document.getElementById(id).select();
		}
		</script>
	</head>
	<body>
		<div id="container">
			<div id="header">
				<a href="/"><img src="style/images/header.jpg" /></a>
			</div>
			<div id="content">
				<div id="intro">
					Welcome to <b>Vipc0de Encryption</b>. Our site offers you a free encryption service,with over <b>30</b> encrypton altghoritms, like hex, binary, base64, AES,md5 ,SHA, ROT13, and so many others.Just click on one the options down below.Stay safe!
				</div>
				<?php
					if(isset($_GET['algorithm'])){
						if($ok == 1){
							if(file_exists('com/algorithms/' . $_GET['algorithm'] . '.php')){
								require_once('com/algorithms/' . $_GET['algorithm'] . '.php');
							}
							else{
								print '<br /><h2>Error occurred.</h2>';
								$info = errorlog('Possible hacking attempt detected.');
								print 'Who? <span class="green">' . $info['ip'] . '</span><span class="red"> & </span><span class="green">' . $info['ag'] . '</span><br />';
								print 'Where? <span class="green">' . $info['uri'] . '</span><br />';
								print 'What? <span class="red">' . $info['message'] . '</span><br /><br />';
								print 'Your action has been logged.<a href="index.php"> Go back</a>';
								print '<br /><br /><br /><br />';
							}
						}
						else{
							print '<br /><h2>Error occurred.</h2>';
							$info = errorlog('Possible hacking attempt detected.');
							print 'Who? <span class="green">' . $info['ip'] . '</span><span class="red"> & </span><span class="green">' . $info['ag'] . '</span><br />';
							print 'Where? <span class="green">' . $info['uri'] . '</span><br />';
							print 'What? <span class="red">' . $info['message'] . '</span><br /><br />';
							print 'Your action has been logged.<a href="index.php"> Go back</a>';
							print '<br /><br /><br /><br />';
						}
					}
					else{
						print '<br /><h2>Error occurred.</h2>';
						$info = errorlog('Possible hacking attempt detected.');
						print 'Who? <span class="green">' . $info['ip'] . '</span><span class="red"> & </span><span class="green">' . $info['ag'] . '</span><br />';
						print 'Where? <span class="green">' . $info['uri'] . '</span><br />';
						print 'What? <span class="red">' . $info['message'] . '</span><br /><br />';
						print 'Your action has been logged.<a href="index.php"> Go back</a>';
						print '<br /><br /><br /><br />';
					}
				?>
			</div>
		</div>
	</body>
</html>