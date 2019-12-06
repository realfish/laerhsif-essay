(function() { 'use strict';

Q.Util = class _STUtil {
	static delegate (event, targSelector, wrapSelector, callback) {
		let $wrap = document.querySelector(wrapSelector);
		
		$wrap.addEventListener(event, function(e) {
			let $target = e.target;
			
			while ( $target && !$target.matches(targSelector + ',' + wrapSelector) ) {
				$target = $target.parentNode;
			}
			if ($target && $target.matches(targSelector)) {
				callback(e, $target);
			}
		});
	}
	
	/**
	 * Ref: https://gist.github.com/gf3/132080/110d1b68d7328d7bfe7e36617f7df85679a08968
	 */
	static fetchJSONP (url, param) {
		let unique = 0;
		
		return new Promise(rs => {
			const script = document.createElement('script');
			const name = `_jsonp_${unique++}`;
			
			let query = '';
			if (param) {
				query = '?';
				for (let key in param) {
					query += key + '=' + param[key] + '&';
				}
				query = query.slice(0, -1);
			}
			
			url = Q.API_DOMAIN + url + query;
			
			if (url.match(/\?/)) {
				url += `&callback=${name}`;
			} else {
				url += `?callback=${name}`;
			}
			
			script.src = url;
			window[name] = json => {
				rs(new Response(JSON.stringify(json)));
				script.remove();
				delete window[name];
			};
			
			document.body.appendChild(script);
		}).then(function(res) {
			return res.json();
		});
	}
	
	/**
	 * Parse hash URL
	 * Ref: https://stackoverflow.com/questions/23699666/javascript-get-and-set-url-hash-parameters
	 * @returns {Object} A JSON-like key-value map
	 */
	static parseHashUrl () {
		let hash = location.hash.substr(1);
		let params = hash.split('&').reduce(function (accumulator, currentValue) {
			let kv = currentValue.split('=');
			accumulator[kv[0]] = kv[1];
			return accumulator;
		}, {});
		
		return params;
	}
	
	/**
	 * Smoothy scrolling
	 * Ref: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
	 * @param {Object} element - The scrolled element
	 * @param {Number} target - Target `scrollTop` value
	 * @param {Number} duration - Scrolling duration
	 * @returns {Promise} A Promise object after scroll ending
	 */
	static scroll (element, target, duration) {
		target = Math.round(target);
		duration = Math.round(duration);
		/*if (duration < 0) {
			return Promise.reject("bad duration");
		}*/
		if (duration === 0) {
			element.scrollTop = target;
			return Promise.resolve();
		}
		
		var start_time = Date.now();
		var end_time = start_time + duration;
		
		var start_top = element.scrollTop;
		var distance = target - start_top;
		
		// based on http://en.wikipedia.org/wiki/Smoothstep
		var smooth_step = function (start, end, point) {
			if (point <= start) { return 0; }
			if (point >= end) { return 1; }
			var x = (point - start) / (end - start); // interpolation
			return x * x * (3 - 2 * x);
		}
		
		return new Promise(function (resolve/*, reject*/) {
			// This is to keep track of where the element's scrollTop is
			// supposed to be, based on what we're doing
			var previous_top = element.scrollTop;
			
			// This is like a think function from a game loop
			var scroll_frame = function () {
				/*if (element.scrollTop != previous_top) {
					reject("interrupted");
					return;
				}*/
				
				// set the scrollTop for this frame
				var now = Date.now();
				var point = smooth_step(start_time, end_time, now);
				var frameTop = Math.round(start_top + (distance * point));
				element.scrollTop = frameTop;
				
				// check if we're done!
				if (now >= end_time) {
					resolve();
					return;
				}
				
				// If we were supposed to scroll but didn't, then we
				// probably hit the limit, so consider it done; not
				// interrupted.
				if (element.scrollTop === previous_top
					&& element.scrollTop !== frameTop) {
					resolve();
					return;
				}
				previous_top = element.scrollTop;
				
				// schedule next frame for execution
				setTimeout(scroll_frame, 0);
			}
			
			// boostrap the animation process
			setTimeout(scroll_frame, 0);
		});
	}
	static scrollWinY (target, duration) {
		let win = window;
		
		target = Math.round(target);
		duration = Math.round(duration);
		if (duration === 0) {
			win.scrollTo(0, target);
			return Promise.resolve();
		}
		
		let start_time = Date.now();
		let end_time = start_time + duration;
		let start_top = win.scrollY;
		let distance = target - start_top;
		let smooth_step = function (start, end, point) {
			if (point <= start) { return 0; }
			if (point >= end) { return 1; }
			var x = (point - start) / (end - start);
			return x * x * (3 - 2 * x);
		}
		
		return new Promise(function (resolve) {
			let previous_top = win.scrollY;
			let scroll_frame = function () {
				let now = Date.now();
				let point = smooth_step(start_time, end_time, now);
				let frameTop = Math.round(start_top + (distance * point));
				win.scrollTo(0, frameTop);
				
				if (now >= end_time) {
					resolve();
					return;
				}
				if (win.scrollY === previous_top && win.scrollY !== frameTop) {
					resolve();
					return;
				}
				previous_top = win.scrollY;
				setTimeout(scroll_frame, 0);
			}
			
			setTimeout(scroll_frame, 0);
		});
	}
	
	static template (tmplId, tmplData) {
		let tmplText = document.getElementById(tmplId).text;
		let tmplFunc = doT.template(tmplText);
		return tmplFunc(tmplData);
	}
	
	static handleVideo (videoTargSelector, videoWrapSelector) {
		let doc = document;
		
		// Click the video cover
		// this.delegate('click', '.stream-media--video', '.home-stream', function (e, $target) {
		this.delegate('click', videoTargSelector, videoWrapSelector, function (e, $target) {
			let $video = $target.querySelector('video');
			
			// Check whether there is any video in PIP mode
			if (doc.pictureInPictureElement) {
				// Chrome PIP: There is a video in Chrome PIP mode
				console.log('There is a video in Chrome PIP mode');
				
				console.log('Pause the PIP video');
				doc.pictureInPictureElement.pause();
				
				console.log('Exit the PIP mode');
				doc.exitPictureInPicture();
			} else if ($video.webkitSupportsPresentationMode && typeof $video.webkitSetPresentationMode === "function" && $video.webkitPresentationMode === "picture-in-picture") {
				// Safari PIP: The current video is in Safari PIP mode
				console.log('The current video is in Safari PIP mode');
				
				console.log('Change the current video into inline mode');
				$video.webkitSetPresentationMode('inline'); 
			}/*  else {
				// No PIP
				console.log('No PIP');
			} */
			
			// Check whether there is any video in fullscreen mode
			if (!doc.fullscreenElement && $video.requestFullscreen) {
				// No fullscreen & fullscreen usable
				console.log('No full screenn & fullscreen usable');
				$video.requestFullscreen();
				$video.style.visibility = 'visible';
			}
			
			// Hanlde fullscreen mode's changing
			let hanleFullscreenChange = function () {
				console.log('Fullscreen mode changing');
				
				/* if (doc.pictureInPictureElement) {
					// There is a video in Chrome PIP mode
					console.log('There is a video in Chrome PIP mode');
					console.log('Do nothing');
				} else if ($video.webkitSupportsPresentationMode && typeof $video.webkitSetPresentationMode === "function" && $video.webkitPresentationMode === "picture-in-picture") {
					// The current video is in Safari PIP mode
					console.log('The current video is in Safari PIP mode');
					console.log('Do nothing');
				} */
				
				if (!doc.fullscreenElement) {
					// Just be exiting from the fullscreen mode
					console.log('Just be exiting from the fullscreen mode');
					
					if (doc.pictureInPictureElement) {
						// There is a video in Chrome PIP mode
						console.log('There is a video in Chrome PIP mode');
						console.log('Do nothing');
					} else if ($video.webkitSupportsPresentationMode && typeof $video.webkitSetPresentationMode === "function" && $video.webkitPresentationMode === "picture-in-picture") {
						// The current video is in Safari PIP mode
						console.log('The current video is in Safari PIP mode');
						console.log('Do nothing');
					} else {
						// No PIP
						console.log('No PIP');
						
						console.log('Pause the video');
						$video.style.visibility = 'hidden';
						$video.pause();
						
						console.log('Remove the listener');
						$video.removeEventListener('fullscreenchange', hanleFullscreenChange);
					}
					
					/* console.log('Pause the video');
					$video.style.visibility = 'hidden';
					$video.pause();
					
					console.log('Remove the listener');
					$video.removeEventListener('fullscreenchange', hanleFullscreenChange); */
				}
			};
			$video.addEventListener('fullscreenchange', hanleFullscreenChange);
			
			// Handle the leaving from Chrome PIP
			let handleLeavePIPChrome = function () {
				// The current video leaves PIP mode in Chrome
				console.log('The current video leaves PIP in Chrome');
				
				console.log('Pause the video');
				$video.style.visibility = 'hidden';
				$video.pause();
				
				$video.removeEventListener('leavepictureinpicture', handleLeavePIPChrome);
			};
			$video.addEventListener('leavepictureinpicture', handleLeavePIPChrome);
			
			// Play the video
			console.log($video);
			$video.play();
		});
	}
};

})();
