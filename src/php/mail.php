<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "6395503211:AAHTos4rsZ3g67fgHSsZImCsCL9BABjOhr0";

//Сюда вставляем chat_id
$chat_id = "-1001971445489";

//Определяем переменные для передачи данных из нашей формы
$name = ($_POST['name']);
$phone = ($_POST['phone']);
$message = ($_POST['message']);
$txt = "";

//Собираем в массив то, что будет передаваться боту
$arr = array(
    'Имя:' => $name,
    'Телефон:' => $phone,
    'Сообщение:' => $message,
);

//Настраиваем внешний вид сообщения в телеграме
foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Передаем данные боту
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo json_encode($data['success'] = true);
} else {
  echo json_encode($data['success'] = false);
}

?>