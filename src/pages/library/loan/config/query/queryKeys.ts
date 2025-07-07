export const libQK = {
	all: () => ['lib'],

	//* Loan
	loan: () => [...libQK.all(), 'loan'],
	loanByUUID: (uuid: string) => [...libQK.loan(), uuid],

	loanPaidByLoanUUID: (uuid: string) => [...libQK.loan(), uuid],
};
