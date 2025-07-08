//* Department
export type IJobTableData = {
	uuid: string;
	client_uuid: string;
	client_name: string;
	work_order: string;

	created_at: string;
	updated_at: string;
	remarks: string;
};

export type IJobEntryTableData = {
	product_uuid: string;
	quantity: number;
	buying_unit_price: number;
	selling_unit_price: number;
	warranty_days: number;
	is_serial_needed: boolean;
	uuid: string;
	job_uuid: string;
	vendor_uuid: string;
	purchased_at: string;
};
