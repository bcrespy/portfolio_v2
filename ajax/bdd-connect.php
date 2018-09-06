<?php

require_once( "bdd-infos.php" );

try 
{
  $bdd = new PDO( "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8", DB_USERNAME, DB_USERPW );
}
catch( Exception $e )
{
  die( 'error' );
}

?>