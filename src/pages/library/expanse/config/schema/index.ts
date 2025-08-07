import { z } from 'zod';

import { NUMBER_DOUBLE_OPTIONAL, STRING_NULLABLE, STRING_OPTIONAL } from '@/utils/validators';

//* Expanse Schema
export const EXPANSE_SCHEMA = z.object({
	job_uuid: STRING_NULLABLE,
	expense_at: STRING_OPTIONAL,
	type: STRING_NULLABLE,
	amount: NUMBER_DOUBLE_OPTIONAL,
	reason: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const EXPANSE_NULL: Partial<IExpanse> = {
	job_uuid: null,
	expense_at: undefined,
	type: null,
	amount: 0,
	reason: null,
	remarks: null,
};

export type IExpanse = z.infer<typeof EXPANSE_SCHEMA>;
