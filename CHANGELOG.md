CHANGELOG
=========

### [v1.6.0][1.6.0] (2020-01-17)

#### Added
+ Add the 404 page into sitemap. Testbench: <https://poisson.laerhsif.com/feed/sitemap.xml?v=1.6.0>

#### Changed
* Update inline footnote’s positioning logic:
	* Position the certain inline footnote every time when its mark is clicked.
	* Rename `fnPositionSide` into `fnPositionSideAll`.
	* Testbench: <https://poisson.laerhsif.com/2020-01-14/?v=1.6.0>

* * *

### [v1.5.1][1.5.1] (2020-01-16)

#### Fixed
- Fix the Atom self reference `href`. Testbench: <https://poisson.laerhsif.com/feed/sitemap.xml?v=1.5.1>

* * *

### [v1.5.0][1.5.0] (2020-01-16)

#### Added
+ Make the sitemap based on RSS 2.0. Testbench: <https://poisson.laerhsif.com/feed/sitemap.xml?v=1.5.0>

* * *

### [v1.4.0][1.4.0] (2020-01-14)

#### Added
+ Attach loading transitions for TOC. Testbench: <https://poisson.laerhsif.com/?v=1.4.0>

#### Changed
* Refine the non-zh & non-jp footnote mark's vertical setting. Testbench: <https://poisson.laerhsif.com/2012-09-27/#fn-mark-1?v=1.4.0>
* Update the `strong:lang(zh)` style in `blockquote`. Testbench: <https://poisson.laerhsif.com/2020-01-14/?v=1.4.0>

#### Fixed
- Fix the statement of var `bodyClassModifier`.

* * *

### [v1.3.0][1.3.0] (2019-12-25)

#### Added
+ Add favicon.
+ Add 4 Apple touch icons & 2 Android icons.
+ Add the footer module into the Index page.

#### Changed
* Update the `-webkit-touch-callout` strategy of `<a>` for better interaction on touch devices like iOS devices.

#### Fixed
- Fix the value of `apple-mobile-web-app-title` meta.

Testbench: <https://poisson.laerhsif.com/?v=1.3.0>

* * *

### [v1.2.0][1.2.0] (2019-12-22)

#### Changed
* Correct `font-familiy` for serveral types of Latin script inline elements in the article body.
* Testbench:
	- <https://poisson.laerhsif.com/2013-08-11/?v=1.2.0>
	- <https://poisson.laerhsif.com/2013-10-10/?v=1.2.0>

* * *

### [v1.1.1][1.1.1] (2019-12-21)

#### Fixed
- Fix `dom4.max.js` comments for `libs.js`.

* * *

### [v1.1.0][1.0.1] (2019-12-18)

#### Changed
* After clicking `.fn-mark`, change the hash URL from footnote item’s anchor ID into mark’s.
* Update `font-size` of `code` elements for articles.
* Remove outline styles for `a:focus`.

Testbench: <https://poisson.laerhsif.com/2014-01-09/?v=1.1.0>

* * *

### [v1.0.1][1.0.1] (2019-12-18)

#### Fixed
- Fix the character `·` invisible issue in the inline footnotes.
- Make a guard & degradation for CSS variables.

Testbench: <https://poisson.laerhsif.com/2017-02-03/?v=1.0.1>

* * *

### [v1.0.0][1.0.0] (2019-12-17)

Release the first version. Testbench: <https://poisson.laerhsif.com/?v=1.0.0>



[1.6.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.5.1...v1.6.0
[1.5.1]:         https://github.com/realfish/laerhsif-essay/compare/v1.5.0...v1.5.1
[1.5.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.4.0...v1.5.0
[1.4.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.3.0...v1.4.0
[1.3.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.2.0...v1.3.0
[1.2.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.1.1...v1.2.0
[1.1.1]:         https://github.com/realfish/laerhsif-essay/compare/v1.1.0...v1.1.1
[1.1.0]:         https://github.com/realfish/laerhsif-essay/compare/v1.0.1...v1.1.0
[1.0.1]:         https://github.com/realfish/laerhsif-essay/compare/v1.0.0...v1.0.1
[1.0.0]:         https://github.com/realfish/laerhsif-essay/compare/af4702e...v1.0.0
