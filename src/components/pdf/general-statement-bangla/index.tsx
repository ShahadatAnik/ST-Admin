import { IGeneralStatement } from '@/pages/procurement/pdf-make/config/schema';

import { DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import '../vfs_fonts';

import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';

export default function Index(data: IGeneralStatement) {
	const headerHeight = 500;
	const footerHeight = 300;

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		header: {
			table: getPageHeader(data) as any,
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},
		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount }),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),

		// * Main Table
		content: [
			{
				table: {
					headerRows: 1,
					widths: ['*', 10, '*', 10, '*', 10, '*'],
					body: [
						[
							{ text: 'Prepared By', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Senior Manager (P&I)', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Director (P&D)', alignment: 'center', border: [false, true, false, false] },
							{ text: '', alignment: 'center', border: [false, false, false, false] },
							{ text: 'Director (PCU)', alignment: 'center', border: [false, true, false, false] },
						],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
