<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

$name = $_POST['name'];
$return_address = $_POST['mail'];
$object = $_POST['object'];
$content = $_POST['content'];


$mail = "baptiste.crespy@gmail.com";
$sujet = "Contact via portfolio : ".$object;

$messageContent = "<b>NOM :</b> ".$name."<br />";
$messageContent.= "<b>EMAIL :</b> ".$return_address."<br />";
$messageContent.= "<b>OBJET :</b> ".$object."<br />";
$messageContent.= "<b>DEMANDE :</b><br /><br/>".nl2br($content);

$message_html = "<html><head></head><body><p>".$messageContent."</p></body></html>";

$header = "From: \"portfolio\"\n";
$header.= "Reply-to: ".$return_address."\n";
$header.= "MIME-Version: 1.0\n";
$header.= "Content-Type: text/html;\n";


$m = @mail( $mail, $sujet, $message_html, $header );

die( $m ? json_encode(["success"=>true]) : json_encode(["success" => false]) );

?>