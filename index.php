<?php
    // $data = json_decode(file_get_contents('php://input'), TRUE);
    // file_put_contents('file.txt', '$data: '.print_r($data, 1)."\n", FILE_APPEND);

    // echo("$data");
    // echo("hi");


    // //https://api.telegram.org/bot*2020484979:AAHSsZuXd_rVRbWUC174VJbbW0aa2PtMxkU/setwebhook?url=*URL*

    // $token = '2020484979:AAHSsZuXd_rVRbWUC174VJbbW0aa2PtMxkU';

    // $message = $data['message']['text'];

    // $params = [
    //     'chat_id' => $data['message']['chat']['id'],
    //     'text'    => $message
    // ];

    // file_get_contents('https://api.telegram.org/bot'.$token.'/sendMessage?'.http_build_query($params));

    $data = file_get_contents('php://input');
$data = json_decode($data, true);
 
if (empty($data['message']['chat']['id'])) {
	exit();
}
 
define('TOKEN', '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11');

file_put_contents(__DIR__ . '/message.txt', print_r($data, true));

if (!empty($data['message']['text'])) {
	$text = $data['message']['text'];
	echo $text;
}

    echo("$data");
    echo("21");

   