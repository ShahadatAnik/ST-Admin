import { z } from 'zod';

import {
	BOOLEAN_DEFAULT_VALUE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Job Schema
export const JOB_SCHEMA = z.object({
	client_uuid: STRING_REQUIRED,
	work_order: STRING_NULLABLE.optional(),
	to_date: STRING_OPTIONAL.nullable(),
	subject: STRING_OPTIONAL.optional(),

	job_entry: z.array(
		z.object({
			index: NUMBER_OPTIONAL,
			uuid: STRING_OPTIONAL,
			job_uuid: STRING_OPTIONAL,
			product_uuid: STRING_REQUIRED,
			vendor_uuid: STRING_OPTIONAL.nullable(),
			quantity: NUMBER_REQUIRED.min(1, 'Quantity must be greater than 0'),
			buying_unit_price: NUMBER_DOUBLE_REQUIRED,
			selling_unit_price: NUMBER_DOUBLE_REQUIRED,
			warranty_days: NUMBER_OPTIONAL,
			purchased_at: STRING_OPTIONAL.nullable(),
			is_serial_needed: BOOLEAN_DEFAULT_VALUE(false),
			product_serial: z.array(
				z.object({
					uuid: STRING_OPTIONAL,
					job_entry_uuid: STRING_OPTIONAL,
					serial: STRING_NULLABLE.optional(),
					index: NUMBER_REQUIRED.min(1, 'Index must be greater than 0'),
				})
			),
		})
	),
});

export const JOB_NULL: Partial<IJob> = {
	client_uuid: '',
	work_order: '',
	job_entry: [
		{
			product_uuid: '',
			vendor_uuid: null,
			quantity: 0,
			buying_unit_price: 0,
			selling_unit_price: 0,
			warranty_days: 0,
			purchased_at: null,
			is_serial_needed: false,
			product_serial: [],
		},
	],
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
