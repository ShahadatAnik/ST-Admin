//* Department
export type IJobTableData = {
	uuid: string;
	job_id: string;
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

export type IJobDetailsTableProductSerial = {
	uuid: string;
	job_entry_uuid: string;
	serial: string;
	index: number;
};

export type IJobDetailsTableJobEntry = {
	index: number;
	uuid: string;
	job_uuid: string;
	product_uuid: string;
	product_name: string;
	vendor_uuid: string;
	vendor_name: string;
	quantity: number;
	buying_unit_price: number;
	selling_unit_price: number;
	warranty_days: number;
	purchased_at: string;
	is_serial_needed: boolean;
	product_serial: IJobDetailsTableProductSerial[];
};

export type IJobDetailsTablePayment = {
	uuid: string;
	job_uuid: string;
	index: number;
	paid_at: string;
	method: string;
	amount: number;
};

export type IJobDetailsTableData = {
	uuid: string;
	job_id: string;
	client_uuid: string;
	client_name: string;
	work_order: string;
	job_entry: IJobDetailsTableJobEntry[];
	payment: IJobDetailsTablePayment[];
	created_at: string;
	created_by_name: string;
	updated_at: string;
	remarks: string;
};
