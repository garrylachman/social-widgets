<?php

// www matters
function get_counter_number__odnoklassniki( $url ) {
    $CHECK_URL_PREFIX = 'https://connect.ok.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=';

    $check_url = $CHECK_URL_PREFIX . $url;

    $data   = file_get_contents( $check_url );
    $shares = array();

    preg_match( '/^ODKL\.updateCount\(\'odklcnt0\',\'(\d+)\'\);$/i', $data, $shares );

    return (int)$shares[ 1 ];
}
