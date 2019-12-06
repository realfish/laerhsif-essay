let doc = document;

// Misc
import _misc from './_misc';
_misc();

// Class



// View
import viewEssay from './view/essay';

// View router
let view = doc.querySelector('body').classList[0];

switch (view) {
	case 'essay': {
		viewEssay();
		break;
	}
}

