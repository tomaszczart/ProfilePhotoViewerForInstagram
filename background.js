'use strict';

chrome.runtime.onInstalled.addListener(function (object) {

    //Check if message was shown before.
    if (localStorage.getItem("PPVFI-1") != "1") {

        chrome.tabs.create({url: "https://www.facebook.com/DesktopTVRemote/"});

        if(object.reason == "install") {
            chrome.tabs.create({url: "/welcome_page/index.html"});//new user
        }else if(object.reason == "update"){
            chrome.tabs.create({url: "/welcome_page/index2.html"});//old version was detected
        }

        //Prevent from displaying this message again
        localStorage.setItem("PPVFI-1", "1");
    }

});