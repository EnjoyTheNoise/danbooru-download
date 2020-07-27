// ==UserScript==
// @name         danbooru-download
// @version      2137
// @description  I'm lazy ass weeb
// @author       Zettai Ryouiki
// @homepage     https://github.com/EnjoyTheNoise/danbooru-download
// @match        https://danbooru.donmai.us/posts/*
// @grant none
// ==/UserScript==

(() => {
  "use strict";

  const keyCode = 191; // "/" key, you can change it to w/e you like, grab code from here: https://keycode.info/

  const keyPressed = e => {
    const code = e.keyCode;

    if (code === keyCode) {
      try {
        const { url, name } = getDownloadInfo();
        downloadUrl(url, name);
      } catch (error) {
        console.log(error);
        return; // I don't really care
      }
    } else {
      return;
    }
  };

  const getDownloadInfo = () => {
      const sectionEntry = document.getElementById("post-option-download");
      const url = sectionEntry.getElementsByTagName("a")[0].getAttribute("href");

      const name = url.split("/").pop().split("?").shift();

      return { url, name };
  }

  const downloadUrl = (url, name) => {
    let link = document.createElement("a");

    link.download = name;
    link.href = url;
    link.target = "_blank";
    link.dispatchEvent(new MouseEvent("click"));

    link = null; //let GC handle this
  };

  document.addEventListener("keydown", keyPressed, false);
})();
