import { IDefaultAddOrUpdateProps, IDefaultSerialAddOrUpdateProps } from '@/types';

import { IJobEntryTableData, IJobTableData } from '../columns/columns.type';
import { IJob } from '../schema';

export interface IClientAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IJobTableData | null;
}

export interface ISerialAddOrUpdateProps extends IDefaultSerialAddOrUpdateProps {
	updatedData: IJob['job_entry'][number] | null;
}
