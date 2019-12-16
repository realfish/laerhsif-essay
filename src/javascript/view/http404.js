/* global Han */

export default function () {

let doc = document;
let win = window;



// Init Han.css
Han(doc.querySelector('.article'))
.initCond()
.renderElem()
.renderHanging()
.renderJiya()
.renderHWS()
/* .correctBasicBD() */
/* .substCombLigaWithPUA() */;



// Click endmark to go to Index
let $body = doc.querySelector('.article-body');
let winWidth;

$body.addEventListener('click', function (e) {
	winWidth = win.innerWidth || doc.clientWidth || doc.body.clientWidth;
	
	const ENDMARK_H = winWidth > 480 ? 32 : 28;
	
	let clickX = e.offsetX;
	let clickY = e.offsetY;
	let bodyW  = $body.offsetWidth;
	let bodyH  = $body.offsetHeight;
	let bodyPW = $body.querySelector('p').clientWidth;
	
	if ((clickY <= bodyH && clickY >= bodyH - ENDMARK_H) &&
	    (clickX >= (bodyW - bodyPW)/2 && clickX <= bodyW - (bodyW - bodyPW)/2)) {
		// console.log('bang H & W');
		win.location.href = doc.querySelector('body').getAttribute('data-root');
	}
});



}
