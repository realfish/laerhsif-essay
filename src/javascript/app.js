let doc = document;

// Misc
import _misc from './_misc';
_misc();

// Class



// View
import viewIndex from './view/index';
import viewEssay from './view/essay';

// View router
let view = doc.querySelector('body').classList[0];

switch (view) {
	case 'index': {
		viewIndex();
		break;
	}
	case 'essay': {
		viewEssay();
		break;
	}
}

