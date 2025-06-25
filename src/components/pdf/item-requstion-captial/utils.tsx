import { EUB_LOGO } from '@/assets/images/base64';

import { DEFAULT_FONT_SIZE, xMargin } from '../ui';
import { getEmptyColumn } from '../utils';

const PAGE_HEADER_EMPTY_ROW: string[] = ['', '', '', ''];

export const getPageHeader = () => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: [70, '*', 70, '*'],
		body: [
			[
				{
					image: EUB_LOGO,
					width: 70,
					height: 40,
					alignment: 'left',
				},
				{
					text: [`\n`, `\n`],
					alignment: 'left',
				},
				{
					colSpan: 2,
					text: [
						{
							text: 'Thread Order Sheet\n',
							fontSize: DEFAULT_FONT_SIZE + 4,
							bold: true,
						},
						`O/N:\n`,
						`Date:\n`,
						`PI Number:\n`,
					],
					alignment: 'right',
				},
				'',
			],
			PAGE_HEADER_EMPTY_ROW,

			// * Start of table
		],
	};
};

const EMPTY_COLUMN: string[] = getEmptyColumn(4);

export const getPageFooter = ({ currentPage, pageCount }: { currentPage: number; pageCount: number }) => {
	// return [
	// 	{
	// 		table: {
	// 			headerRows: 1,
	// 			widths: ['*', 10, '*', 10, '*'],
	// 			body: [
	// 				[
	// 					{
	// 						text: ``,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 					{
	// 						text: ``,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 					{
	// 						text: ``,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 					{
	// 						text: ``,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 					{
	// 						text: ``,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 				],
	// 				[
	// 					{ text: 'Requested By', alignment: 'center', border: [false, true, false, false] },
	// 					{ text: '', alignment: 'center', border: [false, false, false, false] },
	// 					{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
	// 					{ text: '', alignment: 'center', border: [false, false, false, false] },
	// 					{ text: 'P&I CODE', alignment: 'center', border: [false, true, false, false] },
	// 				],
	// 			],
	// 		},
	// 		margin: [xMargin, 2],
	// 	},
	// 	{ text: '\n' },
	// 	{
	// 		table: {
	// 			headerRows: 1,
	// 			widths: ['*', '*'],
	// 			body: [
	// 				[{ text: 'Remarks', colSpan: 2 }, ''],
	// 				[
	// 					{ text: 'Requisitioner:\n\n\n\n\n', rowSpan: 5 },
	// 					{ text: 'P&I:\n\n\n\n\n', rowSpan: 5 },
	// 				],
	// 				[{ text: '' }, { text: '' }],
	// 				[{ text: '' }, { text: '' }],
	// 				[{ text: '' }, { text: '' }],
	// 				[{ text: '' }, { text: '' }],
	// 				[
	// 					{
	// 						colSpan: 2,
	// 						text: `Page ${currentPage} of ${pageCount}`,
	// 						alignment: 'center',
	// 						border: [false, false, false, false],
	// 					},
	// 					'',
	// 				],
	// 			],
	// 		},
	// 		margin: [xMargin, 2],
	// 		fontSize: DEFAULT_FONT_SIZE,
	// 	},
	// ];
};
