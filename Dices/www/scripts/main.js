// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    var die1 = 0;
    var die2 = 0;
    var diceTotal = 0;
    var totalRolls = 0;
    var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);
        updateDiceImage();
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
        navigator.notification.confirm(
            'Exit the app?',
            quitApp,
            'Exit',
            ['Yes', 'No']
        );
    }

    function quitApp(buttonIndex) {
        if (buttonIndex != 2) {
            navigator.app.exitApp();
        }
    }

    function rollDice() {
        var interval = setInterval(animateDiceRoll, 100);
        document.getElementById("roll-result").innerHTML = "Rolling...";
        setTimeout(
            function () {
                clearInterval(interval);
                diceTotal = die1 + die2;
                document.getElementById("roll-result").innerHTML = "You rolled " + diceTotal;
                rolls[diceTotal]++;
                totalRolls++
                updateTable();
            }, 2000);
    }

    function animateDiceRoll() {
        die1 = Math.floor((Math.random() * 6) + 1);
        die2 = Math.floor((Math.random() * 6) + 1);
        updateDiceImage();
    }

    function updateDiceImage() {
        var urlDie1 = "<img src='images/Face_" + JSON.stringify(die1) + ".png'>";
        var urlDie2 = "<img src='images/Face_" + JSON.stringify(die2) + ".png'>";
        document.getElementById("die1value").innerHTML = urlDie1;
        document.getElementById("die2value").innerHTML = urlDie2;
    }

    function updateTable() {
        for (var i = 2; i <= 12; i++) {
            document.getElementById("score" + JSON.stringify(i)).innerHTML = JSON.stringify(rolls[i]);
            if (totalRolls != 0) {
                document.getElementById("percent" + JSON.stringify(i)).innerHTML = JSON.stringify(Math.round((rolls[i] / totalRolls) * 100)) + "%";
            } else {
                document.getElementById("percent" + JSON.stringify(i)).innerHTML = "0";
            }
        }
    }

    function reset(buttonIndex) {
        if (buttonIndex != 2) {
            die1 = 0;
            die2 = 0;
            diceTotal = 0;
            totalRolls = 0;
            rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            updateDiceImage();
            document.getElementById("roll-result").innerHTML = "Tap to Roll";
            updateTable()
        }
    }

    function onClear() {
        navigator.notification.confirm(
            'Reset everything?',
            reset,
            'Reset',
            ['Yes', 'No']
        );
    }
})();