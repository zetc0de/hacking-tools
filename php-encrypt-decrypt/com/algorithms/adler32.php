<?php

if(isset($_POST['check0'])){
	$output = hash('crc32',$_POST['value']);
	$input = $_POST['value'];
}
else{
	$output = '';
	$input = '';
}

?>
<h2>Crc32 checksum generator</h2>
<h2>Input</h2>
<form action="" method="post" id="0">
	<input type="hidden" name="value"  id="v0"/>
	<input type="hidden" name="check0"   />
</form>
<div id="input_wrapper">
	<textarea id="input"><?php print $input; ?></textarea>
</div>
<h2>Output</h2>
<div id="input_wrapper">
	<textarea id="output" onClick="SelectAll('output');" readonly><?php print $output; ?></textarea>
</div>
<div id="options">
<div class="service" onClick="submit();">
				<div class="text">
							Encrypt
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
