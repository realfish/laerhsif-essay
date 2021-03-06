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



// Positioning footnotes
const SCREEN_WIDTH_THRESHOLD = 896;
const ARROW_LEFT_TUNING      = -4;

let $wrap       = doc.querySelector('.article');
let $body       = doc.querySelector('.article-body');
let $footnote   = doc.querySelector('.article-footnote');
let $allFnItems = doc.querySelectorAll('.article-footnote li');
let $allFnMarks = doc.querySelectorAll('.article-body .fn-mark');
let wrapTop, bodyWidth, bodyPLeft, bodyPWidth, winWidth;

let fnPositionSideAll = function () {
	wrapTop    = $wrap.offsetTop;
	bodyWidth  = $body.offsetWidth;
	bodyPLeft  = $body.querySelector('p').offsetLeft;
	bodyPWidth = $body.querySelector('p').offsetWidth;
	
	$footnote.style.top   = wrapTop + 'px';
	$footnote.style.right = bodyWidth - bodyPLeft - bodyPWidth + 'px';
	$footnote.style.width = '';
	
	for (let i = 0; i < $allFnItems.length; i++) {
		let $crntItem   = $allFnItems[i];
		let $crntMark   = $allFnMarks[i];
		let crntMarkTop = $crntMark.offsetTop;
		
		$crntItem.style.top = crntMarkTop + 'px';
		$crntItem.style.left = $crntItem.style.right = '';
		$crntItem.style.setProperty('--arrow-left', '');
	}
};
let fnPositionInlineAll = function () {
	wrapTop    = $wrap.offsetTop;
	bodyWidth  = $body.offsetWidth;
	bodyPLeft  = $body.querySelector('p').offsetLeft;
	bodyPWidth = $body.querySelector('p').offsetWidth;
	
	$footnote.style.top   = wrapTop + 'px';
	$footnote.style.right = bodyWidth - bodyPLeft - bodyPWidth + 'px';
	$footnote.style.width = bodyPWidth + 'px';
	
	// Compute the line-height of <p>
	let pLH = win.getComputedStyle(doc.querySelector('.article-body p')).getPropertyValue('line-height');
	pLH = pLH.substring(0, pLH.length - 2);
	
	for (let i = 0; i < $allFnItems.length; i++) {
		let $crntItem     = $allFnItems[i];
		let $crntMark     = $allFnMarks[i];
		let crntMarkTop   = $crntMark.offsetTop;
		let crntMarkLeft  = $crntMark.offsetLeft;
		let crntMarkWidth = $crntMark.offsetWidth;
		
		$crntItem.style.top = crntMarkTop + parseInt(pLH, 10) + 'px';
		
		if (crntMarkLeft <= bodyWidth / 2) {
			$crntItem.style.left  = '0px';
			$crntItem.style.right = '';
		} else {
			$crntItem.style.left  = '';
			$crntItem.style.right = '0px';
		}
		
		let crntItemLeft = $crntItem.offsetLeft;	// This value is updated by above settings
		let arrowLeft = crntMarkLeft - (crntItemLeft + (bodyWidth - bodyPWidth)/2) + crntMarkWidth/2 + ARROW_LEFT_TUNING;
		$crntItem.style.setProperty('--arrow-left', arrowLeft - 2 + 'px');
	}
};
let fnPositionInline = function (index) {
	wrapTop    = $wrap.offsetTop;
	bodyWidth  = $body.offsetWidth;
	bodyPLeft  = $body.querySelector('p').offsetLeft;
	bodyPWidth = $body.querySelector('p').offsetWidth;
	
	$footnote.style.top   = wrapTop + 'px';
	$footnote.style.right = bodyWidth - bodyPLeft - bodyPWidth + 'px';
	$footnote.style.width = bodyPWidth + 'px';
	
	// Compute the line-height of <p>
	let pLH = win.getComputedStyle(doc.querySelector('.article-body p')).getPropertyValue('line-height');
	pLH = pLH.substring(0, pLH.length - 2);
	
	let $crntItem     = $allFnItems[index];
	let $crntMark     = $allFnMarks[index];
	let crntMarkTop   = $crntMark.offsetTop;
	let crntMarkLeft  = $crntMark.offsetLeft;
	let crntMarkWidth = $crntMark.offsetWidth;
	
	$crntItem.style.top = crntMarkTop + parseInt(pLH, 10) + 'px';
	
	if (crntMarkLeft <= bodyWidth / 2) {
		$crntItem.style.left  = '0px';
		$crntItem.style.right = '';
	} else {
		$crntItem.style.left  = '';
		$crntItem.style.right = '0px';
	}
	
	let crntItemLeft = $crntItem.offsetLeft;	// This value is updated by above settings
	let arrowLeft = crntMarkLeft - (crntItemLeft + (bodyWidth - bodyPWidth)/2) + crntMarkWidth/2 + ARROW_LEFT_TUNING;
	$crntItem.style.setProperty('--arrow-left', arrowLeft - 2 + 'px');
};

if ($allFnItems.length > 0 && $allFnMarks.length > 0) {
	win.addEventListener('load', function () {
		winWidth = win.innerWidth || doc.clientWidth || doc.body.clientWidth;
		
		if (winWidth > SCREEN_WIDTH_THRESHOLD) {
			fnPositionSideAll();
		}/*  else {
			fnPositionInlineAll();
		} */
	});
	win.addEventListener('resize', function () {
		winWidth = win.innerWidth || doc.clientWidth || doc.body.clientWidth;
		
		if (winWidth > SCREEN_WIDTH_THRESHOLD) {
			fnPositionSideAll();
		} else {
			fnPositionInlineAll();
		}
	});
	
	for (let i = 0; i < $allFnMarks.length; i++) {
		let $crntFnMark = $allFnMarks[i];
		
		$crntFnMark.addEventListener('click', function (e) {
			e.preventDefault();
			
			if (winWidth > SCREEN_WIDTH_THRESHOLD) {
				// Scroll to the related side note
			} else {
				// Positioning the current inline note
				fnPositionInline(i);
				// Toggle (show/hide) the related inline note
				$allFnItems[i].classList.toggle('is-active');
			}
			
			// Update hash URL without window scrolling
			let $target = e.target;
			while ( $target && !$target.matches('.article-body a.fn-mark, body') ) {
				$target = $target.parentNode;
			}
			if ($target && $target.matches('.article-body a.fn-mark')) {
				// let targetHash = $target.getAttribute('href');
				let targetHash = '#' + $target.getAttribute('id');
				if (targetHash !== win.location.hash) {
					// history.pushState({}, '', targetHash);
					// Update hash URL without refreshing window or adding history state
					history.replaceState({}, '', targetHash);
				}
			}
		});
	}
	doc.addEventListener('click', function (e) {
		let $target = e.target;
		
		while ( $target && !$target.matches('.article-footnote li.is-active, .fn-mark, body') ) {
			$target = $target.parentNode;
		}
		
		if ( !($target && $target.matches('.article-footnote li.is-active, .fn-mark')) ) {
			// Click the area apart from notes or marks, hide all active notes
			let $allActiveFnItems = doc.querySelectorAll('.article-footnote li.is-active');
			for (let i = 0; i < $allActiveFnItems.length; i++) {
				$allActiveFnItems[i].classList.remove('is-active');
			}
		}
	});
}



// Click endmark to go to Index
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
