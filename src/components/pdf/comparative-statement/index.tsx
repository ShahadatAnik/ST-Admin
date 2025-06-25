import { EUB_LOGO } from '@/assets/images/base64';
import { IComparative } from '@/pages/procurement/pdf-make/config/schema';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

function transformData(data: any) {
	if (!data || data.length === 0) {
		return [];
	}

	const result: { [key: string]: any }[] = [];
	const keys = Object.keys(data[0]);

	keys.forEach((primaryKey) => {
		const newObj = { name: primaryKey } as { [key: string]: any };

		data.forEach((item: any) => {
			newObj[item.name] = item[primaryKey];
		});

		result.push(newObj);
	});

	return result;
}
export default function Index(data: IComparative) {
	const headerHeight = 20;
	const footerHeight = 100;
	const newData = transformData(data?.vendors).slice(1);
	const node: { name: string; headerStyle: string; field: string; cellStyle: string; alignment: string }[] = [];

	Object.entries(transformData(data?.vendors)[0] || {}).forEach(([key]) => {
		node.push({
			name: key,
			field: key,
			headerStyle: 'header',
			cellStyle: 'cell',
			alignment: 'center',
		});
	});

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
					widths: ['*', 10, '*', 10, '*'],
					body: [
						[
							{
								text: 'Zobayer Ahmed\nSenior Manager (P&I)',
								alignment: 'center',
								border: [false, true, false, false],
							},
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{
								text: 'Nakib AL Kausar\nDirector (P&D)',
								alignment: 'center',
								border: [false, true, false, false],
							},
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{
								text: 'Md. Emadadul Haque\nDirector (PCU)',
								alignment: 'center',
								border: [false, true, false, false],
							},
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
				text: 'Comparative Statement',
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
							{
								text: `Item/Work Description: ${data?.description}`,
								colSpan: 4,
								border: [true, true, true, false],
							},
							'',
							'',
							'',
						],
					],
				},
			},
			{
				table: {
					headerRows: 1,
					widths: [...Array(node.length).fill('*')],
					body: [
						[
							...node.map((col) => ({
								text: col.name,
								style: col.headerStyle,
								alignment: 'center',
								bold: true,
							})),
						],
						...(newData || []).map((item) => [
							...node.map((nodeItem) => ({
								text: (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							})),
						]),
					],
				},
			},
			{
				table: {
					headerRows: 1,
					widths: ['*'],
					body: [[{ text: 'Notes\n\n\n\n\n', border: [true, false, true, true] }]],
				},
			},
		],
	});

	return pdfDocGenerator;
}
