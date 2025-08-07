import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Product Schema
export const PRODUCT_CATEGORY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const PRODUCT_CATEGORY_NULL: Partial<IProductCategory> = {
	name: '',
	short_name: null,
	remarks: null,
};

export type IProductCategory = z.infer<typeof PRODUCT_CATEGORY_SCHEMA>;
