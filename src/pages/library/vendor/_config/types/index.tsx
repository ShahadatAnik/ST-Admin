import { IDefaultAddOrUpdateProps } from '@/types';

import { IVendorTableData } from '../columns/columns.type';

export interface IVendorAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IVendorTableData | null;
}
