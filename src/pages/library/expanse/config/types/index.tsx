import { IDefaultAddOrUpdateProps } from '@/types';

import { IExpanseTableData } from '../columns/columns.type';

//* Expanse
export interface IExpanseAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IExpanseTableData | null;
}
