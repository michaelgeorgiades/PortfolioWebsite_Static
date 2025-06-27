<?php
// contact.php

// 1. CONFIGURATION
$recaptchaSecret = '6LfwV3ArAAAAAPqK3zwG3avaS963lEZ3z-S_tRzC'; // Get this from https://www.google.com/recaptcha/admin
$recipientEmail = 'me@michaelgeorgiades.co.za';

// 2. VERIFY reCAPTCHA
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
$remoteIp = $_SERVER['REMOTE_ADDR'];

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($verifyUrl . '?secret=' . $recaptchaSecret . '&response=' . $recaptchaResponse . '&remoteip=' . $remoteIp);
$responseData = json_decode($response);

if (!$responseData->success) {
    http_response_code(403);
    echo json_encode(['error' => 'reCAPTCHA validation failed']);
    exit;
}

// 3. VALIDATE & SANITIZE INPUT
$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// 4. SEND EMAIL
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$body = "Name: $name\nEmail: $email\nSubject: $subject\n\n$message";

if (mail($recipientEmail, "Contact Form: $subject", $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail failed']);
}
?>
