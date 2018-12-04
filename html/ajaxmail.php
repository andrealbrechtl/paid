<?php
// Change Here for the emails
$fromEmail = 'support@froiden.com'; // Replace with your email address
$toEmail = 'rakesh@froiden.com'; // Replace with your email address
$subject = 'Sinewave Contact Us Mail';
// Changes end here

$output = array();
$username = sanitize('username');
$email = sanitize('email');
$message = sanitize('msg');

// If user has submitted the form blank
if ($email === '' || $username === '' || $message === '') {
    $output['status'] = 'fail';
    $output['message'] = '<div class="alert alert-danger">Please, fill details.</div>';
    echo json_encode($output);
    exit();
}

// Validate the email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $output['status'] = 'fail';
    $output['message'] = '<div class="alert alert-warning">Please, provide valid Email.</div>';

} else {
    $message = 'Hi Admin..<p>' . $username . ' has sent a query having email id as ' . $email . '</p><p>Message is : ' . $message . '</p>';
    $headers = 'MIME-Version: 1.0' . '\r\n';
    $headers .= 'Content-type:text/html;charset=UTF-8' . '\r\n';
    $headers .= 'From: <' . $fromEmail . '>' . '\r\n';

    if (mail($toEmail, $subject, $message, $headers)) {
        $output['status'] = 'success';
        $output['message'] = '<div class="alert alert-success">Mail Sent successfully.</div>';

    } else {
        $output['status'] = 'fail';
        $output['message'] = '<div class="alert alert-danger">Please, Try Again.</div>';
    }
}

// Print the response in json format
echo json_encode($output);


// Function to sanitize the post data

function sanitize($data)
{
    return filter_var(trim($_POST[$data]), FILTER_SANITIZE_STRING);
}

?>