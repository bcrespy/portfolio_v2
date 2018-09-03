<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');



$error = array();
$extension = array("jpeg","jpg","png","gif");

$uniqid = uniqid();
$txtGalleryName = "../public/img/work/".$uniqid;

mkdir($txtGalleryName);

$saved_list = array();

foreach( $_FILES["files"]["tmp_name"] as $key=>$tmp_name )
{
  $file_name = $_FILES["files"]["name"][$key];
  $file_tmp = $_FILES["files"]["tmp_name"][$key];
  $ext = pathinfo($file_name,PATHINFO_EXTENSION);
  if( in_array($ext,$extension) )
  {
    if(!file_exists($txtGalleryName."/".$file_name))
    {
      move_uploaded_file($file_tmp=$_FILES["files"]["tmp_name"][$key], $txtGalleryName."/".$file_name);
      $saved_list[] = 'work/'.$uniqid.'/'.$file_name;
    }
    else
    {
      $filename =basename($file_name,$ext);
      $newFileName=$filename.time().".".$ext;
      move_uploaded_file($file_tmp=$_FILES["files"]["tmp_name"][$key], $txtGalleryName."/".$newFileName);
      $saved_list[] = 'work/'.$uniqid.'/'.$file_name;
    }
  }
  else
  {
    array_push($error,"$file_name, ");
  }
}

$return = array(
  "error" => $error,
  "saved" => $saved_list
);

die( json_encode($return) );


?>