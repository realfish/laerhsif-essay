(function () {
	'use strict';

	function _misc () {
	  var doc = document; // UA marking

	  var UA_LIST = ['iPhone', 'iPad', 'MQQBrowser', 'Android', 'MicroMessenger'];
	  var ua = navigator.userAgent;
	  var $html = doc.getElementsByTagName('html')[0];

	  for (var i = 0; i < UA_LIST.length; i++) {
	    var uaRegExp = new RegExp(UA_LIST[i]);

	    if (ua.match(uaRegExp)) {
	      $html.classList.add('ua-' + UA_LIST[i]);
	    }
	  }

	  if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) {
	    $html.classList.add('ua-Safari');
	  }

	  if (!('ontouchstart' in window)) {
	    $html.classList.add('ua-Pointer');
	  } // Enable the CSS `:active` interactions


	  doc.getElementsByTagName('body')[0].addEventListener('touchstart', function () {});
	  doc.getElementsByTagName('main')[0].addEventListener('touchstart', function () {}); // Twist HTML language
	  // doc.getElementsByTagName('html')[0].setAttribute('lang', 'en');
	}

	/* global Han */
	function viewIndex () {
	  var doc = document; // let win = window;
	  // Init Han.css

	  Han(doc.querySelector('.index-list')).initCond().renderElem().renderHanging().renderJiya().renderHWS().correctBasicBD().substCombLigaWithPUA();
	}

	/* global Han */
	function viewEssay () {
	  var doc = document;
	  var win = window; // Init Han.css

	  Han(doc.querySelector('.article')).initCond().renderElem().renderHanging().renderJiya().renderHWS().correctBasicBD().substCombLigaWithPUA(); // Positioning footnotes

	  var SCREEN_WIDTH_THRESHOLD = 896;
	  var $wrap = doc.querySelector('.article');
	  var $body = doc.querySelector('.article-body');
	  var $footnote = doc.querySelector('.article-footnote');
	  var $allFnItems = doc.querySelectorAll('.article-footnote li');
	  var $allFnMarks = doc.querySelectorAll('.article-body .fn-mark');
	  var wrapTop, bodyWidth, bodyPLeft, bodyPWidth, winWidth;

	  var fnPositionSide = function fnPositionSide() {
	    wrapTop = $wrap.offsetTop;
	    bodyWidth = $body.offsetWidth;
	    bodyPLeft = $body.querySelector('p').offsetLeft;
	    bodyPWidth = $body.querySelector('p').offsetWidth;
	    $footnote.style.top = wrapTop + 'px';
	    $footnote.style.right = bodyWidth - bodyPLeft - bodyPWidth + 'px';
	    $footnote.style.width = '';

	    for (var i = 0; i < $allFnItems.length; i++) {
	      var $crntItem = $allFnItems[i];
	      var $crntMark = $allFnMarks[i];
	      var crntMarkTop = $crntMark.offsetTop;
	      $crntItem.style.top = crntMarkTop + 'px';
	      $crntItem.style.left = $crntItem.style.right = '';
	      $crntItem.style.setProperty('--arrow-left', '');
	    }
	  };

	  var funPositionInline = function funPositionInline() {
	    wrapTop = $wrap.offsetTop;
	    bodyWidth = $body.offsetWidth;
	    bodyPLeft = $body.querySelector('p').offsetLeft;
	    bodyPWidth = $body.querySelector('p').offsetWidth;
	    $footnote.style.top = wrapTop + 'px';
	    $footnote.style.right = bodyWidth - bodyPLeft - bodyPWidth + 'px';
	    $footnote.style.width = bodyPWidth + 'px'; // Compute the line-height of <p>

	    var pLH = win.getComputedStyle(doc.querySelector('.article-body p')).getPropertyValue('line-height');
	    pLH = pLH.substring(0, pLH.length - 2);

	    for (var i = 0; i < $allFnItems.length; i++) {
	      var $crntItem = $allFnItems[i];
	      var $crntMark = $allFnMarks[i];
	      var crntMarkTop = $crntMark.offsetTop;
	      var crntMarkLeft = $crntMark.offsetLeft;
	      $crntItem.style.top = crntMarkTop + parseInt(pLH, 10) + 'px';

	      if (crntMarkLeft <= bodyWidth / 2) {
	        $crntItem.style.left = '0px';
	      } else {
	        $crntItem.style.right = '0px';
	      }

	      var crntItemLeft = $crntItem.offsetLeft; // This value is updated by above settings

	      var arrowLeft = crntMarkLeft - (crntItemLeft + (bodyWidth - bodyPWidth) / 2);
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

	  var _loop = function _loop(i) {
	    var $crntFnMark = $allFnMarks[i];
	    $crntFnMark.addEventListener('click', function (e) {
	      e.preventDefault();

	      if (winWidth > SCREEN_WIDTH_THRESHOLD) ; else {
	        // Toggle (show/hide) the related inline note
	        $allFnItems[i].classList.toggle('is-active');
	      } // Update hash URL without window scrolling


	      var $target = e.target;

	      while ($target && !$target.matches('.article-body a.fn-mark, body')) {
	        $target = $target.parentNode;
	      }

	      if ($target && $target.matches('.article-body a.fn-mark')) {
	        history.pushState({}, '', $target.getAttribute('href'));
	      }
	    });
	  };

	  for (var i = 0; i < $allFnMarks.length; i++) {
	    _loop(i);
	  }

	  doc.addEventListener('click', function (e) {
	    var $target = e.target;

	    while ($target && !$target.matches('.article-footnote li.is-active, .fn-mark, body')) {
	      $target = $target.parentNode;
	    }

	    if (!($target && $target.matches('.article-footnote li.is-active, .fn-mark'))) {
	      // Click the area apart from notes or marks, hide all active notes
	      var $allActiveFnItems = doc.querySelectorAll('.article-footnote li.is-active');

	      for (var _i = 0; _i < $allActiveFnItems.length; _i++) {
	        $allActiveFnItems[_i].classList.remove('is-active');
	      }
	    }
	  });
	}

	var doc = document; // Misc

	_misc(); // Class

	var view = doc.querySelector('body').classList[0];

	switch (view) {
	  case 'index':
	    {
	      viewIndex();
	      break;
	    }

	  case 'essay':
	    {
	      viewEssay();
	      break;
	    }
	}

}());
//# sourceMappingURL=app.js.map
