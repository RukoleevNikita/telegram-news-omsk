<?php
    $data = json_decode(file_get_contents('php://input'), TRUE);
    file_put_contents('file.txt', '$data: '.print_r($data, 1)."\n", FILE_APPEND);

    echo("asd");


    //https://api.telegram.org/bot*2020484979:AAHSsZuXd_rVRbWUC174VJbbW0aa2PtMxkU/setwebhook?url=*URL*

    $token = '2020484979:AAHSsZuXd_rVRbWUC174VJbbW0aa2PtMxkU';

    $message = $data['message']['text'];

    $params = [
        'chat_id' => $data['message']['chat']['id'],
        'text'    => $message
    ];

    file_get_contents('https://api.telegram.org/bot'.$token.'/sendMessage?'.http_build_query($params));

   