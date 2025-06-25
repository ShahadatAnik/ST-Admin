import { EUB_LOGO } from '@/assets/images/base64';
import { IWorkOrder } from '@/pages/procurement/pdf-make/config/schema';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IWorkOrder) {
	const headerHeight = 20;
	const footerHeight = 50;
	const node = [
		getTable('index', 'No', 'center'),
		getTable('description', 'Description'),
		getTable('quantity', 'Quantity', 'right'),
		getTable('unit_price', 'Unit Price', 'right'),
		getTable('total_price', 'Total', 'right'),
	];

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount }) as any,
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),
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
				text: 'Work Order',
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
					widths: ['*', '*'],
					body: [
						[
							{
								text: `To,\n${data?.employee_designation},\n${data?.vendor_company_name},\n${data?.vendor_address},\n${data?.employee_contact_number}`,
								alignment: 'left',
							},
							{ text: `Date: ${format(getDateTime(), 'dd-MM-yyyy')}`, alignment: 'right' }, // { text: `Date: ${format(getDateTime(), 'dd-MM-yyyy')}`, alignment: 'right' },
						],
					],
				},
				layout: 'noBorders',
			},
			{ text: '\n' },

			{ text: `Subject: ${data?.subject}`, bold: true },
			{ text: '\n' },
			{ text: `Greetings!` },
			{ text: `${data?.body_opening}`, alignment: 'justify' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, '*', '*', '*', '*'],
					body: [
						node.map((col) => ({
							text: col.name,
							style: col.headerStyle,
							alignment: 'center',
							bold: true,
						})),
						...(data?.product || []).map((item, index) =>
							node.map((nodeItem) => ({
								text: nodeItem.field === 'index' ? index + 1 : (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
						[
							{ text: `Total:`, colSpan: 4, alignment: 'right' },
							{},
							{},
							{},
							{ text: data?.grand_total || 0, alignment: 'right' },
						],
					],
				},
			},
			{ text: `In Words: ${data?.in_words}`, bold: true },
			{ text: '\n' },
			{ ul: data?.payment.map((item) => ({ text: item.condition })) },
			{
				ul: [
					'Price Mention in BDT excluding VAT / TAX',
					`Completion of work by ${format(data?.completion_date, 'MMM dd, yyyy')}`,
				],
			},
			{ text: '\n' },
			{ text: `${data?.body_ending}`, alignment: 'justify' },
			{ text: '\n' },
			{ text: 'Thanking You,' },
		],
	});

	return pdfDocGenerator;
}
