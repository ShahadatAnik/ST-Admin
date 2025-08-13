import { IDefaultAddOrUpdateProps, IDefaultSerialAddOrUpdateProps } from '@/types';

import { IJobEntryTableData, IJobTableData } from '../columns/columns.type';
import { IJob } from '../schema';

export interface IClientAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IJobTableData | null;
}

export interface ISerialAddOrUpdateProps extends IDefaultSerialAddOrUpdateProps {
	updatedData: IJob['job_entry'][number] | null;
}
export interface InputItem {
	product: string;
	vendor: string;
	quantity: number;
	buying_unit_price: number;
	selling_unit_price: number;
	warranty_days: number;
	purchased_at: number;
	serial: number | string;
}

export interface ProductSerial {
	serial: string;
	index: number;
}

export interface OutputItem {
	product_uuid: string;
	vendor_uuid: string | null;
	quantity: number;
	buying_unit_price: number;
	selling_unit_price: number;
	warranty_days: number;
	purchased_at: string | null;
	is_serial_needed: boolean;
	product_serial: ProductSerial[];
}
