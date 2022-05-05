<?php

$name = $_POST['name'];
$username = $_POST['username'];
$msg = $_POST['msg'];
$token = "5096731567:AAGi2jvRZm5GOHsOQkuc1LlKAdkxIEWEKPE";
$chat_id = "-736192937";
$arr = array(
  'Имя: ' => $name,
  'Ник:' => $username,
  'Сообщение:' => $msg
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thanks.html');
} else {
  echo "Error";
}
?>