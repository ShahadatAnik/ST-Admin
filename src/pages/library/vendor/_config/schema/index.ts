import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Client Schema
export const VENDOR_SCHEMA = z.object({
	name: STRING_REQUIRED,
	phone: STRING_NULLABLE,
	address: STRING_NULLABLE,
	purpose: STRING_NULLABLE,
	starting_date: STRING_NULLABLE,
	ending_date: STRING_NULLABLE,
	product_type: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	name: '',
	phone: null,
	address: null,
	purpose: null,
	starting_date: null,
	ending_date: null,
	product_type: null,
	remarks: null,
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;
