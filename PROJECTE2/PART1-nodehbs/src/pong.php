<!doctype html>
<html>
<head>
    <title>PHP: Ping Pong Simulation Game!</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">

</head>
<body>


    <style>
    /* Styles */
        * {
            margin: 0;
            padding: 0;

        }

        body {
            background: pink;
            font-family: "Roboto Slab";

        }

        header {

            width: 100%;
            height: 150px;
            background: blue;
            color: white;

        }

        .pp_head {
            text-align: center;

        }

        .content {
            line-height: 1.5;
            position: relative;
            width: 400px;
            margin: 20px auto;
            background: yellow;
            /*padding: 15px;*/
            box-sizing: content-box;

        }

        div.rallies:nth-child(2n) {
            background: lightgreen;
            color: orangered;

        }

        .rallies {
            padding-left: 20px;
        }

        footer {
            text-align: center;
            margin-top: 20px;

        }

        .logo {
            position: relative; 
            top: 20px;
            margin: 0 auto;
            display: block;
            width: 100px;
            height: 100px;
            border-radius: 100%;

        }

        h2.winner {
            margin-top: 10px;
            padding: 10px;
            text-align: center;
            font-size: 17pt;
            text-transform: uppercase;
            color: red;
        }

        p span {
            font-weight: bold;

        }
    </style>


    <?php


        //initialise and declare variables for player and round scores.
        $player1 = 0;
        $player2 = 0;
        $round = 0;
    ?>






    <header>
        <img class="logo" src = "logo.png" />
    </header>

    <div class="pp_head">
        <h1>PHP Ping Pong Simulation Game</h1>

        <p> Let's play!</p>
    </div>

    <div class = "content">

        <div class="round">
            <?php

                //WIN
                //player must reach a score of 11
                //player must be a minimum of 2 point higher than opponent

                //continue the game while the absolute value is less than ;
                while (abs($player1 - $player2) < 2 || $player1 < 11 && $player2 < 11) {
                   $round++;
                   echo "<div class =\"rallies\">";
                   echo "<h2>Round $round</h2>\n";

                   //random scores between 1 (max) and 0 (min)
                   if(rand(0,1)) {
                     $player1++;

                   } else {
                     $player2++;
                   }
                   echo "Player1 = $player1<br />\n";
                   echo "Player2 = $player2<br />\n";
                   echo "</div>";
                }
            ?>
        </div>

        <div class = "winner">
            <?php
                if($player1 > $player2) {
                   echo "<h2 class=\"winner\">Player 1";
                } else {
                   echo "<h2 class=\"winner\">Player 2";
                }

                echo " is the winner after $round rounds</h2>"; 
            ?>
        </div>
     </div>

    <footer>
        <p>PHP Ping Pong Simulation Game. From Teehouse by Jonnie Grieve Digital Media</a></p> 
    </footer>
</body>

</html>