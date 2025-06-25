import pdfMake from 'pdfmake/build/pdfmake';

// import pdfFonts from 'pdfmake/build/vfs_fonts';
import { vfs } from './vfs_fonts';

const BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts';
const ROBOTO = BASE_URL + '/Roboto/Roboto-';
pdfMake.vfs = vfs;
pdfMake.fonts = {
	Roboto: {
		normal: ROBOTO + 'Regular.ttf',
		bold: ROBOTO + 'Medium.ttf',
		italics: ROBOTO + 'Italic.ttf',
		bolditalics: ROBOTO + 'MediumItalic.ttf',
	},
	Bangla: {
		normal: 'NotoSansBengali-Medium.ttf',
		bold: 'NotoSansBengali-Bold.ttf',
	},
};

export default pdfMake;
