/* global Han */

export default function () {

let doc = document;
// let win = window;



// Init Han.css
Han(doc.querySelector('.index-list'))
.initCond()
.renderElem()
.renderHanging()
.renderJiya()
.renderHWS()
/* .correctBasicBD() */
/* .substCombLigaWithPUA() */;



}
