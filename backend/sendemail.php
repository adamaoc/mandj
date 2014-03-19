<?php

define("BASE_URL","/");
define("ROOT_PATH",$_SERVER["DOCUMENT_ROOT"] . "/");


/* This file contains instructions for three different states of the form:
 *   - Displaying the initial contact form
 *   - Handling the form submission and sending the email
 *   - Displaying a thank you message
 */

// a request method of post indicates that
// we are receiving a form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // the form has fields for name, email, and message
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $city = trim($_POST["city"]);
    $message = trim($_POST["message"]);

    // echo "name ".$name." email ".$email." city ".$city." message ".$message;

    // the fields name, email, and message are required
    if ($name == "" OR $email == "" OR $message == "") {
        $error_message = "You must specify a value for name, email address, and message.";
        header("Location: " . BASE_URL . "contact/#status=error");
        exit;
    }

    // this code checks for malicious code attempting
    // to inject values into the email header
    if (!isset($error_message)) {
        foreach( $_POST as $value ){
            if( stripos($value,'Content-Type:') !== FALSE ){
                $error_message = "There was a problem with the information you entered.";
            }
        }
    }

    // the field named address is used as a spam honeypot
    // it is hidden from users, and it must be left blank
    if (!isset($error_message) && $_POST["address"] != "") {
        $error_message = "Your form submission has an error.";
    }

    require_once(ROOT_PATH . "backend/class.phpmailer.php");
    $mail = new PHPMailer();

    if (!isset($error_message) && !$mail->ValidateAddress($email)){
        $error_message = "You must specify a valid email address.";
    }

    // if, after all the checks above, there is no message, then we
    // have a valid form submission; let's send the email
    if (!isset($error_message)) {
        $email_body = "";
        $email_body = $email_body . "Name: " . $name . "<br>";
        $email_body = $email_body . "Email: " . $email . "<br>";
        $email_body = $email_body . "City: " . $city . "<br>";
        $email_body = $email_body . "Message: " . $message;

        $mail->SetFrom($email, $name);
        $address = "mayerbdom@yahoo.com"; // too address
        $mail->AddAddress($address, "M and J");
        $mail->Subject    = "Testing Contact Form Submission | " . $name;
        $mail->MsgHTML($email_body); 

        // if the email is sent successfully, redirect to a thank you page;
        // otherwise, set a new error message
        if($mail->Send()) {
            header("Location: " . BASE_URL . "contact/#status=thanks");
            exit;
        } else {
          $error_message = "There was a problem sending the email: " . $mail->ErrorInfo;
          echo $error_message;
        }

    }
}
