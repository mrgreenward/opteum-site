$driver = 'Неизвестно';
if ($post['client'] == 'org') {
    header("Location: reg-org.html");
    $driver = 'Руководитель';
} else if ($post['client'] == 'driver') {
    header("Location: reg-driver.html");
    $driver = 'Водитель';
}

$roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
    'key'     => 'MjE1NDU6MjQyMzM6ZDYwYzJjYzI5YTkyMGEwZDk3N2IyNmRhNDMyMjI3NDM=',
    'title'   => 'Таксиграция',
    'comment' => 'Тип клиента '.$post['client'].', '.$post['city'],
    'name'    => $post['name'],
    'email'   => $post['email'],
    'phone'   => $post['phone'],
    'is_need_callback' => '0',
    'fields'  => array("589384" => $post['city'],
                        "585240" => $post['city'],
                        "585266" => $post['city'],
                       "585472" => $driver),
);

file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));