import { table } from 'console';
import { jobHeaderPdf, ST_LOGO } from '@/assets/images/base64';
import { IJobDetailsTableData } from '@/pages/library/job/_config/columns/columns.type';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { TakaToWord } from '@/lib/num-to-words';
import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter, transformProductDataArray } from './utils';

export default function Index(data: IJobDetailsTableData) {
	const headerHeight = 20;
	const footerHeight = 50;

	const products = transformProductDataArray(data.job_entry);

	const node = [
		getTable('index', 'No', 'center'),
		getTable('description', 'Description'),
		getTable('quantity', 'Quantity', 'right'),
	];

	// Compute totals
	let total = 0;
	products.forEach((product) => {
		total += Number(product.quantity) || 0;
	});

	// Build dynamic total row based on node length
	const totalRow = (() => {
		const cells: any[] = [];
		const leftCols = node.length - 1;
		console.log(leftCols);
		cells.push({ text: 'Total', colSpan: leftCols, alignment: 'right' });
		for (let i = 0; i < leftCols - 1; i++) {
			cells.push({});
		}
		cells.push({ text: total, alignment: 'right' });
		return cells;
	})();

	// Assemble table body
	const tableBody: any[] = [];
	// Header row
	tableBody.push(
		node.map((col) => ({
			text: col.name,
			style: col.headerStyle,
			alignment: 'center',
			bold: true,
		}))
	);
	// Data rows
	(products || []).forEach((item, index) => {
		tableBody.push(
			node.map((nodeItem) => ({
				text: String((item as any)[nodeItem.field] ?? ''),
				style: nodeItem.cellStyle,
				alignment: nodeItem.alignment,
				rowSpan: nodeItem.field === 'description' ? 1 : 2,
				border: nodeItem.field === 'description' ? [false, false, false, false] : [true, false, true, false],
			}))
		);
		tableBody.push(
			node.map((nodeItem) => ({
				text: nodeItem.field === 'description' ? item.serial.join(', ') : '',
				style: nodeItem.cellStyle,
				alignment: nodeItem.alignment,
				fontSize: DEFAULT_FONT_SIZE - 2,
				color: '#1A1A1A',
				border: [false, false, true, false],
			}))
		);
	});
	// Totals row
	tableBody.push(totalRow);

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({ xMargin, headerHeight, footerHeight }),

		// Page footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount, data }) as any,
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),
		info: {
			title: `Challan - ${data?.job_id || ''}`,
		},

		// Main content
		content: [
			{
				image: jobHeaderPdf,
				width: 550,
				height: 60,
				alignment: 'right',
			},
			{ text: '\n' },
			{
				text: 'Challan',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE + 2,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: `Date: ${data?.to_date ? format(data.to_date, 'dd MMM, yyyy') : ''}` },
			{ text: 'To,' },
			{ text: 'Vice Chancellor,' },
			{ text: 'European University of Bangladesh,' },
			{ text: '2/4, Gabtoli, Mirpur, Dhaka- 1216,' },
			{ text: '\n' },
			{ text: `Subject: ${data?.subject}`, bold: true },
			{ text: '\n' },
			{ text: 'Dear Sir, ' },
			{
				text: 'Please find below specification & pricing which we hope that you will find as per your requirement',
				alignment: 'justify',
			},
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [
						15, // No
						'*', // Description
						35, // Quantity
					],
					body: tableBody,
				},
				// layout: 'noBorders',
			},
			{ text: '\n' },
		],
	});

	return pdfDocGenerator;
}
