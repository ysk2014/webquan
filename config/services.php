<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, Mandrill, and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => '',
        'secret' => '',
    ],

    'mandrill' => [
        'secret' => '',
    ],

    'ses' => [
        'key' => '',
        'secret' => '',
        'region' => 'us-east-1',
    ],

    'stripe' => [
        'model'  => App\User::class,
        'key' => '',
        'secret' => '',
    ],

    'qq' => [
        'client_id' => '101272985',
        'client_secret' => 'd7b94c947a5150bf97ab439801b4671f',
        'redirect' => 'http://web-engineer.cn/auth/qq/callback',  
    ],
    'weibo' => [
        'client_id' => '1498409001',
        'client_secret' => 'b325bfe4871625d0f3f9bfbc8cf61d31',
        'redirect' => 'http://web-engineer.cn/auth/weibo/callback',  
    ],

];
