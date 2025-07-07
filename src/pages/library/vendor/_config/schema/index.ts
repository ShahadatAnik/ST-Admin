import { start } from 'repl';
import { z } from 'zod';

import {
	EMAIL_REQUIRED,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Client Schema
export const VENDOR_SCHEMA = z.object({
	name: STRING_REQUIRED,
	phone: STRING_REQUIRED,
	address: STRING_REQUIRED,
	purpose: STRING_REQUIRED,
	starting_date: STRING_REQUIRED,
	ending_date: STRING_REQUIRED,
	product_type: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	name: '',
	phone: '',
	address: '',
	purpose: '',
	starting_date: '',
	ending_date: '',
	product_type: '',
	remarks: null,
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;
