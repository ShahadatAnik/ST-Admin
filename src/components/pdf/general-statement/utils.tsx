import { EUB_LOGO } from '@/assets/images/base64';
import { IGeneralStatement } from '@/pages/procurement/pdf-make/config/schema';
import { format } from 'date-fns';

import { getDateTime } from '@/utils';

import { customTable, DEFAULT_FONT_SIZE } from '../ui';

export const getPageHeader = (data: IGeneralStatement) => {
	const emptyRowNeeded = Math.max(0, 10 - Math.floor((data?.general_note?.length || 0) / 110));
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: ['*'],
		body: [
			[
				{
					table: {
						headerRows: 1,
						widths: [80, 10, '*'],
						body: [
							[
								{
									image: EUB_LOGO,
									width: 50,
									height: 40,
									alignment: 'right',
								},
								{},
								{
									text: ' European University of Bangladesh',
									fontSize: DEFAULT_FONT_SIZE + 14,
									bold: true,
									color: '#023020',
									style: 'header',
								},
							],
							[
								{
									text: 'Gabtoli, Mirpur, Dhaka-1216',
									bold: true,
									alignment: 'center',
									colSpan: 3,
								},
								'',
								'',
							],
						],
					},
					layout: 'noBorders',
				},
			],
			[{ text: '\n' }],
			[{ text: '\n' }],
			[
				{
					text: 'General Note',
					bold: true,
					decoration: 'underline',
					fontSize: DEFAULT_FONT_SIZE + 4,
					alignment: 'center',
				},
			],
			[{ text: '\n' }],
			[
				{
					text: `Date:${format(getDateTime(), 'MMM dd, yyyy')}`,
					alignment: 'right',
				},
			],
			[{ text: '\n' }],
			[
				{
					table: {
						headerRows: 1,
						widths: ['*'],
						body: [
							[
								{
									text: `${data?.general_note}\n\n` + '\n'.repeat(emptyRowNeeded),
									alignment: 'justify',
								},
							],
						],
					},
				},
			],

			// * Start of table
		],
	};
};

export const getPageFooter = ({ currentPage, pageCount }: { currentPage: number; pageCount: number }) => {
	return {
		headerRows: 1,
		widths: ['*'],
		body: [
			[
				{
					text: [
						{ text: 'Accounts Use Only', decoration: 'underline' },
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
						'\n',
					],
					alignment: 'center',
				},
			],
			[
				{
					text: ['\n', '\n', '\n', '\n', '\n', '\n'],
					alignment: 'center',
					border: [false, false, false, false],
				},
			],
			[
				{
					table: {
						headerRows: 1,
						widths: ['*', 10, '*', 10, '*', 10, '*'],
						body: [
							[
								{
									text: 'Manager\n(Accounts)',
									alignment: 'center',
									border: [false, true, false, false],
								},
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{
									text: 'Director (Finance)',
									alignment: 'center',
									border: [false, true, false, false],
								},
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: 'Treasurer', alignment: 'center', border: [false, true, false, false] },
								{ text: '', alignment: 'center', border: [false, false, false, false] },
								{ text: 'V.C', alignment: 'center', border: [false, true, false, false] },
							],
						],
					},
					border: [false, false, false, false],
				},
			],
		],
	};
};
