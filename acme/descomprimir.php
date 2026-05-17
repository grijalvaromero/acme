<?php

$filename = "./Archive.zip";
if (file_exists("./Archive.zip")) {
    $zip = new ZipArchive;
    if ($zip->open($filename) === TRUE) {
        $zip->extractTo('./');
        $zip->close();
        echo 'ok';
    } else {
        echo 'error';
    }
}