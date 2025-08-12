import { jobHeaderPdf, ST_LOGO } from '@/assets/images/base64';
import { IJobDetailsTableData } from '@/pages/library/job/_config/columns/columns.type';
import { IJob } from '@/pages/library/job/_config/schema';
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
		getTable('warranty', 'Warranty'),
		getTable('quantity', 'Quantity', 'right'),
		getTable('unit_price', 'Unit Price', 'right'),
		getTable('total_price', 'Price', 'right'),
		getTable('total_price_with_5_percent', 'Price(with 5% TAX)', 'right'),
	];

	let total = 0;
	let totalWithout5Percent = 0;
	products.forEach((product) => {
		total += Number(product.total_price_with_5_percent) || 0;
		totalWithout5Percent += Number(product.total_price) || 0;
	});

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount, data }) as any,
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),
		// * Main Table
		content: [
			{
				image: jobHeaderPdf,
				width: 550,
				height: 60,
				alignment: 'right',
			},
			{ text: '\n' },
			{
				text: 'Quotation',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE + 2,
				alignment: 'center',
			},
			{ text: '\n' },
			{ text: '\n' },
			{ text: `Date: ${format(getDateTime(), 'dd MMM, yyyy')}` },
			{ text: `To,` },
			{ text: `Vice Chancellor,` },
			{ text: `European University of Bangladesh,` },
			{ text: `2/4, Gabtoli, Mirpur, Dhaka- 1216,` },
			{ text: '\n' },

			{ text: `Subject: Quotation for Toner and Peripherals Purchase`, bold: true },
			{ text: '\n' },
			{ text: `Dear Sir` },
			{
				text: `Please find below specification & pricing which we hope that you will find as per your requirement`,
				alignment: 'justify',
			},
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, 180, '*', '*', '*', '*', 100],
					body: [
						node.map((col) => ({
							text: col.name,
							style: col.headerStyle,
							alignment: 'center',
							bold: true,
						})),
						...(products || []).map((item, index) =>
							node.map((nodeItem) => ({
								text: (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
						[
							{ text: `Total:`, colSpan: 5, alignment: 'right' },
							{},
							{},
							{},
							{},
							{ text: Number(totalWithout5Percent).toFixed(2), alignment: 'right' },
							{ text: Number(total).toFixed(2), alignment: 'right' },
						],
					],
				},
			},
			{ text: '\n' },
			{ text: `In Words: ${TakaToWord(total)}`, bold: true },
			{ text: '\n' },
			{ text: 'Terms & Conditions:', bold: true },
			{ text: '\n' },
			{
				ul: [
					'VAT & TAX: Excluding vat & tax',
					`Delivery time: Within Two days after receiving work order.`,
					'Payment term: Cash Payment/Bank Transfer/ Products will be delivered after cheque passed.',
				],
			},
			{ text: '\n' },
			{ text: 'Best Regards,' },
			{ text: '' },
			{ text: 'Shahir Ahmed,' },
			{ text: 'Senior Executive,' },
			{ text: '(Business Development)' },
			{ text: 'Synap Tech' },
			{ text: 'Email:shahir@synaptech.cloud' },
			{ text: 'Phone: 01614328626' },
		],
	});

	return pdfDocGenerator;
}
