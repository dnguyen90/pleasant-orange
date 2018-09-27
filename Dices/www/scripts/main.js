// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    var dice1 = 0;
    var dice2 = 0;
    var diceTotal = 0;
    var totalRolls = 0;
    var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        document.getElementById("clear-button").addEventListener("click", onClear);
        document.getElementById("dice-roll").addEventListener("click", rollDice);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.

    };


    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.

    };

    function onBackKeyDown() {
        history.go(-1);
        navigator.app.backHistory();
    }

    function rollDice() {
        dice1 = Math.floor((Math.random() * 6) + 1);
        dice2 = Math.floor((Math.random() * 6) + 1);
        diceTotal = dice1 + dice2;
        rolls[diceTotal]++;
        totalRolls++
        updateDiceImage();
        updateTable();
    }

    function updateDiceImage() {
        document.getElementById("dice1value").innerHTML = dice1;
        document.getElementById("dice2value").innerHTML = dice2;
        if (diceTotal == 0) {
            document.getElementById("dice-total").innerHTML = "Tap to Roll";
        } else {
            document.getElementById("dice-total").innerHTML = "Total Value is " + diceTotal;
        }
    }

    function updateTable() {
        for (var i = 2; i <= 12; i++) {
            document.getElementById("score" + JSON.stringify(i)).innerHTML = JSON.stringify(rolls[i]);
            document.getElementById("percent" + JSON.stringify(i)).innerHTML = JSON.stringify(Math.round((rolls[i] / totalRolls) * 100)) + "%";
        }
    }

    function reset(buttonIndex) {
        console.log(buttonIndex);
        if (buttonIndex != 2) {
            for (var i = 2; i <= 12; i++) {
                document.getElementById("score" + JSON.stringify(i)).innerHTML = "0";
                document.getElementById("percent" + JSON.stringify(i)).innerHTML = "0";
            }
            dice1 = 0;
            dice2 = 0;
            diceTotal = 0;
            totalRolls = 0;
            rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            updateDiceImage();
        }
    }

    function onClear() {
        navigator.notification.confirm(
            'Are you sure you want to reset everything',
            reset,
            'Reset',
            ['Yes', 'No']
        );
    }
})();