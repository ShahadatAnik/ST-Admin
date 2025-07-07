import { IDefaultAddOrUpdateProps } from '@/types';

import { IJobTableData } from '../columns/columns.type';

export interface IClientAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IJobTableData | null;
}
