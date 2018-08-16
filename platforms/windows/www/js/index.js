/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
        document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
        document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage);
        document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey);
        var localStorage = window.localStorage;

        window.addEventListener("batterystatus", onBatteryStatus, false);
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);
        document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
        document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
        document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
        document.getElementById("dialogBeep").addEventListener("click", dialogBeep);
        document.getElementById("openBrowser").addEventListener("click", openBrowser);
        document.getElementById("getLanguage").addEventListener("click", getLanguage);
        document.getElementById("getLocaleName").addEventListener("click", getLocaleName);
        document.getElementById("getDate").addEventListener("click", getDate);
        document.getElementById("getCurrency").addEventListener("click", getCurrency);
    },

    onPause: function () {

    },

    onResume: function () {

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function setLocalStorage() {
    localStorage.setItem("Name", "John");
    localStorage.setItem("Job", "Developer");
    localStorage.setItem("Project", "Cordova Project");
}

function showLocalStorage() {
    console.log(localStorage.getItem("Name"));
    console.log(localStorage.getItem("Job"));
    console.log(localStorage.getItem("Project"));
}

function removeProjectFromLocalStorage() {
    localStorage.removeItem("Project");
}

function getLocalStorageByKey() {
    console.log(localStorage.key(0));
}

function onBatteryStatus(info) {
    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
}

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        iamge.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function cameraGetPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });

    function onSuccess(imageURL) {
        var image = document.getElementById('myImage');
        image.src = imageURL;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function dialogAlert() {
    var message = "I am Alert Dialog!";
    var title = "ALERT";
    var buttonName = "Alert Button";
    navigator.notification.alert(message, alertCallback, title, buttonName);

    function alertCallback() {
        console.log("Alert is Dismissed!");
    }
}

function dialogConfirm() {
    var message = "Am I Confirm Dialog?";
    var title = "CONFIRM";
    var buttonLabels = "YES,NO";
    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
        console.log("You clicked " + buttonIndex + " button!");
    }
}

function dialogPrompt() {
    var message = "Am I Prompt Dialog?";
    var title = "PROMPT";
    var buttonLabels = ["YES", "NO"];
    var defaultText = "Default"
    navigator.notification.prompt(message, promptCallback,
        title, buttonLabels, defaultText);

    function promptCallback(result) {
        console.log("You clicked " + result.buttonIndex + " button! \n" +
            "You entered " + result.input1);
    }
}

function dialogBeep() {
    var times = 2;
    navigator.notification.beep(times);
}

function openBrowser() {
    var url = 'https://www.google.com';
    var target = '_blank';
    var options = "location = yes";
    var ref = cordova.InAppBrowser.open(url, target, options);

    ref.addEventListener('loadstart', loadstartCellBack);
    ref.addEventListener('loadstop', loadstopCellBack);
    ref.addEventListener('loaderror', loaderrorCellBack);
    ref.addEventListener('exit', exitCellBack);

    function loadstartCellBack(event) {
        console.log('Loading started: ' + event.url);
    }

    function loadstopCellBack(event) {
        console.log('Loding finished: ' + event.url);
    }

    function loaderrorCellBack(event) {
        console.log('Loading Error: ' + event.url);
    }

    function exitCellBack(event) {
        console.log('Browser is closed.');
    }
}

function getLanguage() {
    navigator.globalization.getPreferredLanguage(onSuccess, onError);

    function onSuccess(language) {
        alert('language: ' + language.value + '\n');
    }

    function onError() {
        alert('Error getting language');
    }
}

function getLocaleName() {
    navigator.globalization.getLocaleName(onSuccess, onError);

    function onSuccess(locale) {
        alert('locale: ' + locale.value);
    }

    function onError() {
        alert('Error getting locale');
    }
}

function getDate() {
    var date = new Date();

    var options = {
        formatLength: 'short',
        selector: 'date and time'
    }
    navigator.globalization.dateToString(date, onSuccess, onError, options);

    function onSuccess(date) {
        alert('date: ' + date.value);
    }

    function onError() {
        alert('Error getting dateString');
    }
}

function getCurrency() {
    var currencyCode = 'EUR';
    navigator.globalization.getCurrencyPattern(currencyCode, onSuccess, onError);

    function onSuccess(pattern) {
        alert('pattern: ' + pattern.pattern + '\n' +
            'code: ' + pattern.code + '\n' +
            'fraction: ' + pattern.fraction + '\n' +
            'rounding: ' + pattern.rounding + '\n' +
            'decimal: ' + pattern.decimal + '\n' +
            'grouping: ' + pattern.grouping);
    }

    function onError() {
        alert('Error getting pattern');
    }
}

document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e) {
    e.preventDefault();
    alert('Back Button is Pressed!');
}