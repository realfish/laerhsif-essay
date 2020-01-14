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



// Load index list
let loadIndexList = function () {
	let $allItems = doc.querySelectorAll('.index-item');
	let itemNum   = $allItems.length;
	
	const ITEM_LOADING_ANIME_DURATION = 250;
	
	for (let i = 0; i < itemNum; i++) {
		setTimeout(function () {
			$allItems[i].classList.remove('is-loading');
		}, ITEM_LOADING_ANIME_DURATION * (i + 1));
	}
};
// win.addEventListener('load', loadIndexList);
doc.addEventListener('readystatechange', loadIndexList);



}
