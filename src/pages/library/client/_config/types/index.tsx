import { IDefaultAddOrUpdateProps } from '@/types';

import { IClientTableData } from '../columns/columns.type';

export interface IClientAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IClientTableData | null;
}
