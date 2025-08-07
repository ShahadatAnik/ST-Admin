import { z } from 'zod';

import { NUMBER_DOUBLE_REQUIRED, STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

//* Loan Schema
export const LOAN_SCHEMA = z.object({
	lender_name: STRING_NULLABLE,
	type: z.enum(['friend', 'business', 'family']),
	amount: NUMBER_DOUBLE_REQUIRED.gt(0),
	taken_at: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const LOAN_NULL: Partial<ILoan> = {
	lender_name: null,
	type: 'business',
	amount: 0,
	taken_at: '',
	remarks: null,
};

export type ILoan = z.infer<typeof LOAN_SCHEMA>;

//* Loan Paid
export const LOAN_PAID_SCHEMA = z.object({
	lender_name: STRING_REQUIRED,
	type: z.enum(['friend', 'business', 'family']),
	amount: NUMBER_DOUBLE_REQUIRED,
	taken_at: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
	loan_paid: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			type: z.enum(['cash', 'mfs', 'cheque']),
			amount: NUMBER_DOUBLE_REQUIRED,

			remarks: STRING_NULLABLE,
		})
	),
});

export const LOAN_PAID_NULL: Partial<ILoanPaid> = {
	loan_paid: [{ uuid: undefined, type: 'cash', amount: 0, remarks: null }],
};

export type ILoanPaid = z.infer<typeof LOAN_PAID_SCHEMA>;
