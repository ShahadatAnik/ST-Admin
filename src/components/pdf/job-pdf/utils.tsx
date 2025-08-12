import { ST_LOGO } from '@/assets/images/base64';
import { IJobDetailsTableData } from '@/pages/library/job/_config/columns/columns.type';
import { format, formatDate } from 'date-fns';
import { number } from 'zod';

import { getDateTime } from '@/utils';

import { customTable, DEFAULT_FONT_SIZE } from '../ui';

export const getPageFooter = ({
	currentPage,
	pageCount,
	data,
	user,
}: {
	currentPage: number;
	pageCount: number;
	data?: IJobDetailsTableData;
	user?: any;
}) => {
	return {
		widths: ['*', '*', '*'],
		body: [
			[
				{
					text: 'info@synaptech.com | 01771199541',
					fontSize: DEFAULT_FONT_SIZE - 4,
					border: [false, true, false, false],
				},
				{
					text: `Synap Tech.cloud `,
					fontSize: DEFAULT_FONT_SIZE - 4,
					alignment: 'center',
					border: [false, true, false, false],
				},
				{
					text: `Page: ${currentPage} of ${pageCount}`,
					fontSize: DEFAULT_FONT_SIZE - 4,
					alignment: 'right',
					border: [false, true, false, false],
				},
			],
		],
	};
};
interface ProductInput {
	index: number;
	product_name: string;
	warranty_days: number;
	quantity: number;
	selling_unit_price: number;
}

interface TransformedProduct {
	index: number;
	description: string;
	warranty: string;
	quantity: number;
	unit_price: string;
	total_price: string;
	total_price_with_5_percent: string;
}

export function transformProductDataArray(dataArray: ProductInput[]): TransformedProduct[] {
	return dataArray.map((data) => {
		const totalPrice = data.quantity * data.selling_unit_price;
		const totalPriceWith5Percent = totalPrice + (totalPrice * 5) / 100;

		return {
			index: data?.index + 1,
			description: data.product_name,
			warranty: data.warranty_days === 0 ? 'N/A' : data.warranty_days + ' days',
			quantity: data.quantity,
			unit_price: data.selling_unit_price.toFixed(2),
			total_price: totalPrice.toFixed(2),
			total_price_with_5_percent: totalPriceWith5Percent.toFixed(2),
		};
	});
}
