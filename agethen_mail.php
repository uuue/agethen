<?php

// kontrolle
/*
echo "Sie haben folgende Angaben gemacht:<br>";
echo "Name: $_POST[name]<br>";
echo "E-Mail: $_POST[mail]<br>";
echo "Telefon: $_POST[tel]<br>";
echo "Nachricht: $_POST[message]<br>";
*/
// zuweisen
$name = $_POST[name];
$mail = $_POST[mail];
$tel = $_POST[tel];
$message = nl2br($_POST[message]); //nl2br um zeilenumbrüche des users in der text-area	 als <br/> zu übergeben

$h_text = $_POST['h_text'];

// empfänger
$empfaenger  = 'agethengmbh@agethen-gmbh.de'  /*. ', '*/;
//$empfaenger .= 'uuuen@gmx.de';  // zusätzliche adresse

// initiator des vorgangs (die ins formular eingetragene e-mail-adresse)
$initiator  = $mail  /*. ', '*/;

// betreff
$betreff = 'Agethen GmbH Webformular';

// mailtext für empfänger
$nachricht_empfaenger = "
<html>
<head>
	<title>Agethen GmbH Webformular</title>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700' rel='stylesheet' type='text/css'>
	<style type='text/css' >
    html, body {
		font-family: Source Sans Pro, Arial, Helvetica, sans-serif;
		font-size: 16px;
		color: #fff;
        background: rgb(0, 157, 224);
        }
    body {
	}
	h1 {
		font-size: 40px;
	    margin: 0;
	}
    .sub {
		font-size: 30px;
        font-weight: 300;
        line-height: 25px;
        opacity: 0.65;
 	    margin: 0 0 25px;
   }
	table {
		margin: 0;
		padding: 0;
		border-spacing: 0;
	}
	table a {
		color: rgb(255, 255, 255);
	}
    tr.message td {
        position: relative;
        top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(255,255,255,0.4);
    }
	td {
		padding: 4px 15px 4px 0;
		vertical-align: top;
        color: rgba(255,255,255,0.65);
	}
	.post {
		font-weight: bold;
        color: rgba(255,255,255,1);
	}
	</style>
</head>
<body>
    <h1>Neue Nachricht </h1>
    <p class='sub'>Agethen GmbH Webformular</p>
	<table>
		<tbody>
			<tr>
				<td>Name:</td>
				<td class='post'>$name</td>
			</tr>
			<tr>
				<td>E-Mail:</td>
				<td class='post'>$mail</td>
			</tr>
			<tr>
				<td>Telefon:</td>
				<td class='post'>$tel</td>
			</tr>
			<tr class='message'>
				<td>Nachricht:</td>
				<td class='post'>$message</td>
			</tr>
		</tbody>
	</table>
</body>
</html>
";

// mailtext für initiator
$nachricht_initiator = "
<html>
<head>
	<title>Agethen GmbH Webformular</title>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700' rel='stylesheet' type='text/css'>
	<style type='text/css' >
    html, body {
		font-family: Source Sans Pro, Arial, Helvetica, sans-serif;
		font-size: 16px;
		color: #fff;
        background: rgb(0, 157, 224);
        }
    body {
	}
	h1 {
		font-size: 40px;
        color: rgba(255,255,255,0.75);
	    margin: 0;
	}
    .name {
        color: rgba(255,255,255,1);
    }
	.mail, a {
		font-weight: bold;
        color: rgb(255,255,255);
	}
    .back-home {
        margin-top:20px;
        display: inline-block;
        color: rgb(0, 157, 224);
        font-weight:700;
        background: #fff;
        padding:10px 15px;
        border-radius:5px;
        text-decoration: none;
    }
	</style>
</head>
<body>
    <h1>Vielen Dank, <span class='name'>$name</span>!</h1>
    <p>Ihre Nachricht wird in K&uuml;rze bearbeitet. Ein Feedback wird an die von Ihnen angegebene E&#8209;Mail&#8209;Adresse <span class='mail'>$mail</span> gesendet.</p>
    <p>Ihre Agethen GmbH</p>
    <a href='http://www.agethen-gmbh.de' class='back-home'>www.agethen-gmbh.de</a>
</body>
</html>
";

if( $h_text == '' && $name != '' && $mail != '' && $message != ''){
	// html gedönse drausmachen
	$header  = 'MIME-Version: 1.0' . "\r\n";
	$header .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	//$header .= "To: agethengmbh@agethen-gmbh.de" . "\r\n";  //
	//$header .= "From: $name <$mail>" . "\r\n";  // fehleranfällig bei falscher e-mail-adresse
	$header .= 'From: Agethen GmbH Webformular' . "\r\n";
	//$header .= "Cc: a@b.c" . "\r\n";  //
	$header .= "Bcc: uuuen@gmx.de" . "\r\n"; //

	// rausballern
	$send_mail=mail($empfaenger, $betreff, $nachricht_empfaenger, $header);
	$send_mail2=mail($initiator, $betreff, $nachricht_initiator, $header);
	if($send_mail){
	header('location: danke.html');
	//echo "Vielen Dank, die Daten wurden &uuml;bermittelt";
	}
	else {
	//echo "ERROR";
	header('location: error.html');
	}
}else{
	header('location: error.html');
}


?>