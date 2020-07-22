<?php
    // Ajax.php
    // Handles receiving data from the contact form

    $contactEmail = "keeley.lp@gmail.com";

    // Manage the headers for this, based on where the message comes from. The port used matters here, so we will
    // have to check for the 'alternative' that Create-React-App might use
    if($_SERVER['HTTP_ORIGIN']=="http://localhost:3000") header('Access-Control-Allow-Origin: http://localhost:3000');
    if($_SERVER['HTTP_ORIGIN']=="http://localhost:3001") header('Access-Control-Allow-Origin: http://localhost:3001');
    if($_SERVER['HTTP_ORIGIN']=="http://localhost:80") header('Access-Control-Allow-Origin: http://localhost:80');

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if($contentType!="text/plain;charset=UTF-8") {
        // This isn't valid data.  Return a basic error
        die(json_encode(['result'=>'fail', 'cause'=>'noinput', 'message'=>'Something is wrong with the request']));
    }

    $content = trim(file_get_contents("php://input"));
    $msg = json_decode($content, true);
    //If json decoding failed, the JSON is invalid
    if(!is_array($msg)) {
        if($_POST['action']!='') reporterror('in action.php: post[action]='. $_POST['action']);
        die(json_encode(['result'=>'fail', 'cause'=>'noinput', 'message'=>'message recieved is not an array']));
    }

    /*
    // We should be ready to send an email now
    mail($contactEmail, "Contact form: message from ". $msg['name'],
        "User's email:". $msg['email'] ." Message: ". $msg['message']
    );
    */

    // With the email sent, we can reply to the client app
    die(json_encode(['result'=>'success']));
?>