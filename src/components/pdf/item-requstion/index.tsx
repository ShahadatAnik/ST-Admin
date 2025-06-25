import { EUB_LOGO } from '@/assets/images/base64';
import { IRequisitionTableData } from '@/pages/procurement/requisition/config/columns/columns.type';
import { departments } from '@/pages/procurement/requisition/utils';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { formatDateTable } from '@/utils/formatDate';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IRequisitionTableData) {
	const headerHeight = 20;
	const footerHeight = 170;

	const node = [
		getTable('index', 'Sl\n No', 'center'),
		getTable('item_name', 'Item'),
		getTable('req_quantity', 'Qty', 'right'),
		getTable('prev_provided_date', 'Date'),
		getTable('prev_provided_quantity', 'Qty', 'right'),
		getTable('sign', 'Sign'),
	];
	const departement_options = departments;
	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header

		// * Page Footer
		footer: (currentPage: number, pageCount: number) => [
			{
				table: {
					headerRows: 1,
					widths: ['*', 10, '*', 10, '*'],
					body: [
						[
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
							{
								text: ``,
								alignment: 'center',
								border: [false, false, false, false],
							},
						],
						[
							{ text: 'Requested By', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Dept. Head', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'P&I CODE', alignment: 'center', border: [false, true, false, false] },
						],
					],
				},
				margin: [xMargin, 2],
			},
			{ text: '\n' },
			{
				table: getPageFooter({ currentPage, pageCount }),
				margin: [xMargin, 2],
				fontSize: DEFAULT_FONT_SIZE,
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
				text: 'Articles Requisition Form',
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
					widths: [15, '*', '*', '*', '*', '*'],
					body: [
						[
							{ text: `UID: ${data?.requisition_id}`, colSpan: 3 },
							'',
							'',
							{ text: `Date: ${format(data?.created_at, 'MMM dd, yyyy')}`, colSpan: 3 },
							'',
							'',
						],
						[
							{ text: `Name: ${data?.created_by_name}`, colSpan: 4 },
							'',
							'',
							'',
							{
								text: `Designation: ${data?.designation ? data?.designation : ''}`,
								colSpan: 2,
							},
							'',
						],
						[
							{
								text: `Department: ${data?.department ? departement_options.find((item) => item.value === data?.department)?.label : ''}`,
								colSpan: 6,
							},
							'',
							'',
							'',
							'',
							'',
						],
						[
							{
								text: 'Sl\n No',
								style: 'tableHeader',
								alignment: 'center',
								rowSpan: 2,
							},
							{
								text: 'Item',
								rowSpan: 2,
								alignment: 'center',
							},
							{
								text: 'Qty',
								style: 'tableHeader',
								alignment: 'center',
								rowSpan: 2,
							},
							{
								text: `Previous Receive Log`,
								alignment: 'center',
								colSpan: 2,
							},
							'',
							{
								text: 'Sign',
								alignment: 'center',
								rowSpan: 2,
							},
						],
						[
							'',
							'',
							'',
							{
								text: 'Date',
								alignment: 'center',
							},
							{
								text: 'Qty',
								alignment: 'center',
							},
							'',
						],
						...(data?.item_requisition || []).map((item, index) =>
							node.map((nodeItem) => ({
								text:
									nodeItem.field === 'index'
										? index + 1
										: nodeItem.field === 'prev_provided_date'
											? format(item?.prev_provided_date, 'MMM dd, yyyy')
											: (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
