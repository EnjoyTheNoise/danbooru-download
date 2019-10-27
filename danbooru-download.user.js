// ==UserScript==
// @name         danbooru-download
// @version      2137
// @description  I'm lazy ass weeb
// @author       Zettai Royouiki
// @homepage     https://github.com/EnjoyTheNoise/danbooru-download
// @match        https://danbooru.donmai.us/posts/*
// @grant none
// ==/UserScript==

(() => {
    'use strict';

    const keyCode = 191 // "/" key, you can change it to w/e you like, grab code from here: https://keycode.info/

    const keyPressed = e => {
        let code = e.keyCode;

        if(code === keyCode) {
            try{
                let imgSection = document.getElementById("image-container");
                let url = imgSection.getAttribute("data-file-url");
                let name = imgSection.querySelector("#image").getAttribute("src").split("/").pop();
                downloadUrl(url, name);
            }
            catch (error) {
                return; // I don't really care
            }
        } else {
            return;
        }
    }

    const downloadUrl = (url, name) => {
        let link = document.createElement("a");

        link.download = name;
        link.href = url;
        link.target = "_blank";
        link.dispatchEvent(new MouseEvent("click"));

        link = null; //let GC handle this
    }

    document.addEventListener("keydown", keyPressed, false);
})();