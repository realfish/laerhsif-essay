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
.correctBasicBD()
.substCombLigaWithPUA();



// Positioning footnotes
const SCREEN_WIDTH_THRESHOLD = 896;

let $wrap       = doc.querySelector('.article');
let $body       = doc.querySelector('.article-body');
let $footnote   = doc.querySelector('.article-footnote');
let $allFnItems = doc.querySelectorAll('.article-footnote li');
let $allFnMarks = doc.querySelectorAll('.article-body .fn-mark');
let wrapTop, bodyWidth, bodyPLeft, bodyPWidth, winWidth;

let fnPositionSide = function () {
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
let funPositionInline = function () {
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
		let $crntItem    = $allFnItems[i];
		let $crntMark    = $allFnMarks[i];
		let crntMarkTop  = $crntMark.offsetTop;
		let crntMarkLeft = $crntMark.offsetLeft;
		
		$crntItem.style.top = crntMarkTop + parseInt(pLH, 10) + 'px';
		
		if (crntMarkLeft <= bodyWidth / 2) {
			$crntItem.style.left = '0px';
		} else {
			$crntItem.style.right = '0px';
		}
		
		let crntItemLeft = $crntItem.offsetLeft;	// This value is updated by above settings
		let arrowLeft = crntMarkLeft - (crntItemLeft + (bodyWidth - bodyPWidth)/2);
		$crntItem.style.setProperty('--arrow-left', arrowLeft - 2 + 'px');
	}
};

win.addEventListener('load', function () {
	winWidth = win.innerWidth || doc.clientWidth || doc.body.clientWidth;
	
	if (winWidth > SCREEN_WIDTH_THRESHOLD) {
		fnPositionSide();
	} else {
		funPositionInline();
	}
});
win.addEventListener('resize', function () {
	winWidth = win.innerWidth || doc.clientWidth || doc.body.clientWidth;
	
	if (winWidth > SCREEN_WIDTH_THRESHOLD) {
		fnPositionSide();
	} else {
		funPositionInline();
	}
});

for (let i = 0; i < $allFnMarks.length; i++) {
	let $crntFnMark = $allFnMarks[i];
	
	$crntFnMark.addEventListener('click', function (e) {
		e.preventDefault();
		
		if (winWidth > SCREEN_WIDTH_THRESHOLD) {
			// Scroll to the related side note
		} else {
			// Toggle (show/hide) the related inline note
			$allFnItems[i].classList.toggle('is-active');
		}
		
		// Update hash URL without window scrolling
		let $target = e.target;
		while ( $target && !$target.matches('.article-body a.fn-mark, body') ) {
			$target = $target.parentNode;
		}
		if ($target && $target.matches('.article-body a.fn-mark')) {
			history.pushState({}, '', $target.getAttribute('href'));
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
