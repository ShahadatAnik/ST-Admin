export const libQK = {
	all: () => ['lib'],

	//* Loan
	loan: (query?: string) => [...libQK.all(), 'loan', query ?? ''],
	loanByUUID: (uuid: string) => [...libQK.loan(), uuid],

	loanPaidByLoanUUID: (uuid: string) => [...libQK.loan(), uuid],
};
