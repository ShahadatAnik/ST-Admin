import { z } from 'zod';

import { NUMBER_DOUBLE_REQUIRED, STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Expanse Schema
export const EXPANSE_SCHEMA = z.object({
	job_uuid: STRING_NULLABLE,
	expense_at: STRING_OPTIONAL,
	type: STRING_REQUIRED,
	amount: NUMBER_DOUBLE_REQUIRED.gt(0),
	reason: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const EXPANSE_NULL: Partial<IExpanse> = {
	job_uuid: null,
	expense_at: undefined,
	type: '',
	amount: 0,
	reason: null,
	remarks: null,
};

export type IExpanse = z.infer<typeof EXPANSE_SCHEMA>;
