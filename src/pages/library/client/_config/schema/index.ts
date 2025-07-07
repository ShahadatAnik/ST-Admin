import { z } from 'zod';

import {
	EMAIL_REQUIRED,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Client Schema
export const CLIENT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	contact_name: STRING_REQUIRED,
	contact_number: PHONE_NUMBER_REQUIRED,
	email: EMAIL_REQUIRED,
	address: STRING_OPTIONAL,
	remarks: STRING_NULLABLE,
});

export const CLIENT_NULL: Partial<IClient> = {
	name: '',
	contact_name: '',
	contact_number: '',
	email: '',
	address: undefined,
	remarks: null,
};

export type IClient = z.infer<typeof CLIENT_SCHEMA>;
