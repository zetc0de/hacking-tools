<?php
function errorlog($message){
	$info = array();
	$info['uri'] = $_SERVER['REQUEST_URI'];
	$info['ip']  = $_SERVER['REMOTE_ADDR'];
	$info['ag']  = $_SERVER['HTTP_USER_AGENT'];
	$info['message'] = $message;
	file_put_contents('com/logs.txt',file_get_contents('com/logs.txt') . $info['uri'] . ' <=> ' .  $info['ip'] . ' <=> ' . $info['ag'] . ' <=> ' . $info['message'] . "\r\n");
  return $info;
}
function asc2bin($input) { 
      $output = '';
	  $tmp = explode("\r\n", chunk_split($input, 1)); 
      for ($n = 0; $n < count($tmp) - 1; $n++) { 
        $output .= substr("0000".base_convert(ord($tmp[$n]), 10, 2), -8); 
      } 
      $output = chunk_split($output, 8, " "); 
      return $output; 
} 

function bin2asc($input) { 
      $output = '';
	  $input = str_replace(" ", "", $input); 
      $tmp = explode("\r\n", chunk_split($input, 8)); 
      for ($n = 0; $n < count($tmp) - 1; $n++) { 
        $output .= chr(base_convert($tmp[$n], 2, 10)); 
      } 
      return $output; 
} 

?>