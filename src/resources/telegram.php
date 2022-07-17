<?php

$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['msg'];
$token = "5096731567:AAGi2jvRZm5GOHsOQkuc1LlKAdkxIEWEKPE";
$chat_id = "-1001502883655";
$arr = array(
  'Имя: ' => $name,
  'Почта:' => $email,
  'Сообщение:' => $msg
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>