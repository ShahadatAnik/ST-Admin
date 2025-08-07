import { z } from 'zod';

import { EMAIL_NULLABLE, PHONE_NUMBER_NULLABLE, STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Client Schema
export const CLIENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	contact_name: STRING_NULLABLE,
	contact_number: PHONE_NUMBER_NULLABLE,
	email: EMAIL_NULLABLE,
	address: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const CLIENT_NULL: Partial<IClient> = {
	name: '',
	contact_name: null,
	contact_number: null,
	email: null,
	address: null,
	remarks: null,
};

export type IClient = z.infer<typeof CLIENT_SCHEMA>;
