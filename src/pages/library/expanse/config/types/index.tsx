import { IDefaultAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { AxiosError } from 'axios';

import { IProductTableData } from '../columns/columns.type';

//* Product
export interface IProductAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProductTableData | null;
}
