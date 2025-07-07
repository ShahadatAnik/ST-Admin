import { z } from 'zod';

import {
	FORTUNE_ZIP_EMAIL_PATTERN,
	PASSWORD,
	PHONE_NUMBER_NULLABLE,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Product Schema
export const PRODUCT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	product_category_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PRODUCT_NULL: Partial<IProduct> = {
	name: '',
	product_category_uuid: '',
	remarks: null,
};

export type IProduct = z.infer<typeof PRODUCT_SCHEMA>;
