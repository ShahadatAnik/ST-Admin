import { InputItem, OutputItem, ProductSerial } from './_config/types';

export async function transformInputToOutput(input: InputItem[]): Promise<OutputItem[]> {
	// Group items by product and vendor for aggregation
	const groupedItems = new Map<string, InputItem[]>();

	input.forEach((item) => {
		const key = `${item.product}_${item.vendor}`;
		if (!groupedItems.has(key)) {
			groupedItems.set(key, []);
		}
		groupedItems.get(key)!.push(item);
	});

	const result: OutputItem[] = [];

	groupedItems.forEach(async (items) => {
		const firstItem = items[0];

		// Create product serial array from input serials
		const productSerial: ProductSerial[] = [];

		// Add serials from input items
		items.forEach((item) => {
			if (item.serial) {
				productSerial.push({
					serial: String(item.serial),
					index: productSerial.length + 1,
				});
			}
		});

		// Pad with empty serials to match quantity
		while (productSerial.length < firstItem.quantity) {
			productSerial.push({
				serial: '',
				index: productSerial.length + 1,
			});
		}
		const outputItem: OutputItem = {
			product_uuid: firstItem.product,
			vendor_uuid: firstItem.vendor,
			quantity: Number(firstItem.quantity),
			buying_unit_price: Number(firstItem.buying_unit_price),
			selling_unit_price: Number(firstItem.selling_unit_price),
			warranty_days: Number(firstItem.warranty_days),
			purchased_at: new Date(firstItem.purchased_at).toISOString(),
			is_serial_needed: productSerial[0].serial === '' ? false : true,
			product_serial: productSerial,
		};

		result.push(outputItem);
	});

	return result;
}
