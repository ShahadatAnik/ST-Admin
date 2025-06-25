import { EUB_LOGO } from '@/assets/images/base64';
import { ItemRequisition } from '@/pages/procurement/pdf-make/config/schema';
import { departments } from '@/pages/procurement/requisition/utils';
import { format } from 'date-fns';
import { get } from 'lodash';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: ItemRequisition) {
	const headerHeight = 20;
	const footerHeight = 300;

	const node = [getTable('index', 'Sl\n No', 'center'), getTable('item', 'Item'), getTable('quantity', 'Qty')];

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header

		// * Page Footer
		footer: (currentPage: number, pageCount: number) => [
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: ['*', 10, '*', 10, '*', 10, '*', 10, '*'],
					body: [
						[
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},

							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
						],
						[
							{ text: 'Requisitioner', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Director\n(P&I)', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Director\n(P&D)', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Director\n(PCU)', alignment: 'center', border: [false, true, false, false] },
						],
						[
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},

							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								alignment: 'center',
								border: [false, false, false, false],
							},
						],
						[
							{ text: 'Approved by:', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Registrar', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
						],
					],
				},
				margin: [xMargin, 2],
			},
		],

		// * Main Table
		content: [
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
								colSpan: 3,
								alignment: 'center',
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				text: 'Articles Requisition Form(Capital)',
				bold: true,
				decoration: 'underline',
				fontSize: DEFAULT_FONT_SIZE + 4,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, '*', '*', 30],
					body: [
						[
							{ text: `UID: ${data?.uuid}`, colSpan: 2 },
							'',
							{ text: `Date: ${format(getDateTime(), 'MMM dd, yyyy')}`, colSpan: 2 },
							'',
						],
						[
							{ text: `Name: ${data?.name}`, colSpan: 2 },
							'',
							{
								text: `Designation: ${data?.designation ? data?.designation : ''}`,
								colSpan: 2,
							},
							'',
						],
						[
							{
								text: `Department: ${data?.department}`,
								colSpan: 4,
							},
							'',
							'',
							'',
						],
						[
							{ text: node[0].name, style: node[0].headerStyle, alignment: 'center', bold: true },
							{
								text: node[1].name,
								style: node[1].headerStyle,
								alignment: 'center',
								bold: true,
								colSpan: 2,
							},
							'',
							{ text: node[2].name, style: node[2].headerStyle, alignment: 'center', bold: true },
						],
						...(data?.item_requisition || []).map((item, index) => [
							{ text: index + 1, style: node[0].cellStyle, alignment: node[0].alignment },
							{
								text: item[node[1].field as keyof typeof item],
								style: node[1].cellStyle,
								alignment: node[1].alignment,
								colSpan: 2,
							},
							'',
							{
								text: item[node[2].field as keyof typeof item],
								style: node[2].cellStyle,
								alignment: node[2].alignment,
							},
						]),
						[{ text: 'Notes\n\n\n\n\n', colSpan: 4 }, '', '', ''],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
