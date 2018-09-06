<?php 

require_once( "bdd-connect.php" );


$request = $bdd->prepare( "SELECT * FROM sandbox s INNER JOIN image img ON s.Image_id = img.id" );
$request->execute();

echo json_encode( $request->fetchAll( PDO::FETCH_ASSOC ) );

$request->closeCursor();

?>