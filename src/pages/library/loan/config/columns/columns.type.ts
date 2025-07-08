//* Loan
export type ILoanTableData = {
	uuid: string;
	lender_name: string;
	type: 'friend' | 'business' | 'family';
	amount: number;
	taken_at: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	total_paid_amount: number;
	loan_paid: LoanPaidTableData[];
};

export type LoanPaidTableData = {
	uuid: string;
	index: number;
	amount: number;
	type: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
