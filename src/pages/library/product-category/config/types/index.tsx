import { IDefaultAddOrUpdateProps } from '@/types';

import { IProductCategoryTableData } from '../columns/columns.type';

//* Product
export interface IProductCategoryAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IProductCategoryTableData | null;
}
