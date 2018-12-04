<?php

// Change Here for the emails
$fromEmail = 'support@froiden.com'; // Replace with your email address
$toEmail = 'rakesh@froiden.com'; // Replace with your email address
$subject = 'New Subscription Mail';
// Changes end here

$output = array();
$email = sanitize('email');

// If user has submitted the form blank
if ($email === '') {
    $output['status'] = 'fail';
    $output['message'] = 'Please, fill details.';
    echo json_encode($output);
    exit();
}

// Validate the email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $output['status'] = 'fail';
    $output['message'] = 'Please, provide valid Email.';

} else {
    $message = 'Hi Admin..<p>New subscription having email id as ' . $email . '</p>';
    $headers = 'MIME-Version: 1.0' . '\r\n';
    $headers .= 'Content-type:text/html;charset=UTF-8' . '\r\n';
    $headers .= 'From: <' . $fromEmail . '>' . '\r\n';

    // Send email
    if (mail($toEmail, $subject, $message, $headers)) {
        $output['status'] = 'success';
        $output['message'] = 'Subscribed successfully.';

    } else {
        $output['status'] = 'fail';
        $output['message'] = 'Please, Try Again.';
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