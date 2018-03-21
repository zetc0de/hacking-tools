<?php
if(isset($_POST['check0'])){
	$output = asc2bin($_POST['value']);
	$input = $_POST['value'];
}
elseif(isset($_POST['check1'])){
	$input = $_POST['value'];
	$err = 0;
	for($i = 0;$i<strlen($input) - 1;$i++){
		if($input{$i} != '0' && $input{$i} != '1' && $input{$i} != ' '){
			$err = 1;
		}
	}

	if($err == 0){
		$output = bin2asc($input);
	}
	else{
		$output = '';
		print '<script>alert("Sorry,but that string does not look like binary code")</script>';
	}
}
else{
	$input = '';
	$output = '';
}
?>
<h2>Binary encoder/decoder</h2>
<h2>Input</h2>
<form action="" method="post" id="0">
	<input type="hidden" name="value"  id="v0"/>
	<input type="hidden" name="check0"   />
</form>
<form action="" method="post" id="1">
	<input type="hidden" name="value"  id="v1"/>
	<input type="hidden" name="check1" >
</form>
<div id="input_wrapper">
	<form action="" method="post">
		<textarea name="input" id="input"><?php print $input ?></textarea>
	</form>
</div>
<h2>Output</h2>
<div id="input_wrapper">
	<textarea id="output" onClick="SelectAll('output');"  readonly><?php print $output ?></textarea>
</div>
<div id="options">
<div class="service" onClick="binary(0);">
				<div class="text">
							Encrypt
						</div>
					</div>
					<div class="service" onClick="binary(1);">
						<div class="text">
							Decrypt
						</div>
					</div>
					<div class="service" id="copy">
						<div class="text">
							Copy
						</div>
					</div>
					<div class="service" onClick="reset();">
						<div class="text">
							Reset
						</div>
					</div>
</div>
<br /><br /><br /><br /><?php require_once('com/footer.php'); ?>
