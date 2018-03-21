<h2>Base64 encoder/decoder</h2>
<h2>Input</h2>
<div id="input_wrapper">
	<textarea id="input"></textarea>
</div>
<h2>Output</h2>
<div id="input_wrapper">
	<textarea id="output" onClick="SelectAll('output');" readonly></textarea>
</div>
<div id="options">
<div class="service" onClick="base64Encode();">
				<div class="text">
							Encrypt
						</div>
					</div>
					<div class="service" onClick="base64Decode();">
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
