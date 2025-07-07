import { IDefaultAddOrUpdateProps } from '@/types';

import { ILoanTableData } from '../columns/columns.type';

//* Loan
export interface ILoanAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ILoanTableData | null;
}
