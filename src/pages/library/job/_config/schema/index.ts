import { method } from 'lodash';
import { index } from 'node_modules/handsontable/helpers/dom';
import { z } from 'zod';

import {
	BOOLEAN_DEFAULT_VALUE,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Job Schema
export const JOB_SCHEMA = z.object({
	client_uuid: STRING_REQUIRED,
	work_order: STRING_REQUIRED,

	job_entry: z.array(
		z.object({
			index: NUMBER_OPTIONAL, // needed for serial input modal
			uuid: STRING_OPTIONAL,
			job_uuid: STRING_OPTIONAL,
			product_uuid: STRING_REQUIRED,
			vendor_uuid: STRING_OPTIONAL,
			quantity: NUMBER_REQUIRED.min(1, 'Quantity must be greater than 0'),
			buying_unit_price: NUMBER_REQUIRED.min(1, 'Buying unit price must be greater than 0'),
			selling_unit_price: NUMBER_REQUIRED.min(1, 'Selling unit price must be greater than 0'),
			warranty_days: NUMBER_REQUIRED.min(1, 'Warranty must be greater than 0'),
			purchased_at: STRING_OPTIONAL,
			is_serial_needed: BOOLEAN_DEFAULT_VALUE(false),
			is_update: BOOLEAN_DEFAULT_VALUE(false),
			product_serial: z.array(
				z.object({
					uuid: STRING_OPTIONAL,
					job_entry_uuid: STRING_OPTIONAL,
					serial: STRING_REQUIRED,
					index: NUMBER_REQUIRED.min(1, 'Index must be greater than 0'),
				})
			),
		})
	),
});

export const JOB_NULL: Partial<IJob> = {
	client_uuid: '',
	work_order: '',
	job_entry: [],
};

export type IJob = z.infer<typeof JOB_SCHEMA>;

//* Job Payment Schema
export const JOB_PAYMENT_SCHEMA = z.object({
	payment: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			job_uuid: STRING_OPTIONAL,
			index: NUMBER_REQUIRED.min(1, 'Index must be greater than 0'),
			paid_at: STRING_OPTIONAL,
			method: STRING_REQUIRED.default('cash'),
			amount: NUMBER_REQUIRED.min(1, 'Amount must be greater than 0'),
		})
	),
});

export const JOB_PAYMENT_NULL: Partial<IJobPayment> = {
	payment: [],
};

export type IJobPayment = z.infer<typeof JOB_PAYMENT_SCHEMA>;
