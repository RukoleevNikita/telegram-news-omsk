<?php
    // $data = json_decode(file_get_contents('php://input'), TRUE);
    // file_put_contents('file.txt', '$data: '.print_r($data, 1)."\n", FILE_APPEND);

    // // echo("$data");
    // // echo("hi");


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
 
define('TOKEN', '2020484979:AAHSsZuXd_rVRbWUC174VJbbW0aa2PtMxkU');
 
// Функция вызова методов API.
function sendTelegram($method, $response)
{
	$ch = curl_init('https://api.telegram.org/bot' . TOKEN . '/' . $method);  
	curl_setopt($ch, CURLOPT_POST, 1);  
	curl_setopt($ch, CURLOPT_POSTFIELDS, $response);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, false);
	$res = curl_exec($ch);
	curl_close($ch);
 
	return $res;
}

if (!empty($data['message']['text'])) {
	$text = $data['message']['text'];
 
	if (mb_stripos($text, 'привет') !== false) {
		sendTelegram(
			'sendMessage', 
			array(
				'chat_id' => $data['message']['chat']['id'],
				'text' => 'Хай!'
			)
		);
 
		exit();	
	} 
}

   