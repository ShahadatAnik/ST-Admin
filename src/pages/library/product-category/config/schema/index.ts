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
export const PRODUCT_CATEGORY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PRODUCT_CATEGORY_NULL: Partial<IProductCategory> = {
	name: '',
	short_name: '',
	remarks: null,
};

export type IProductCategory = z.infer<typeof PRODUCT_CATEGORY_SCHEMA>;
