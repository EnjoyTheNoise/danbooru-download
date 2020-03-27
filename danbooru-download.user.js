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
        const imgSection = getImgSection();
        const { url, name } = getDownloadInfo(imgSection);
        downloadUrl(url, name);
      } catch (error) {
        console.log(error);
        return; // I don't really care
      }
    } else {
      return;
    }
  };

  const getImgSection = () => {
    const sections = document.getElementsByTagName("section");
    const sectionsArray = [...sections];
    const imgSection = sectionsArray.find(section => {
      return section.hasAttribute("data-file-url");
    });
    
    return imgSection;
  };

  const getDownloadInfo = section => {
    const url = section.getAttribute("data-file-url");
    const name = section
      .querySelector("#image")
      .getAttribute("src")
      .split("/")
      .pop();

    return { url, name };
  };

  const downloadUrl = (url, name) => {
    const link = document.createElement("a");

    link.download = name;
    link.href = url;
    link.target = "_blank";
    link.dispatchEvent(new MouseEvent("click"));

    link = null; //let GC handle this
  };

  document.addEventListener("keydown", keyPressed, false);
})();
