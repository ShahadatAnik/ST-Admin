import { lazy } from 'react';
import { IRoute } from '@/types';

const ProductCategory = lazy(() => import('@/pages/library/product-category'));
const Product = lazy(() => import('@/pages/library/product'));

const LibraryRoutes: IRoute[] = [
	{
		name: 'Library',
		children: [
			{
				name: 'Product Category',
				path: '/lib/product-category',
				element: <ProductCategory />,
				page_name: 'lib_product_category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Product',
				path: '/lib/product',
				element: <Product />,
				page_name: 'lib_product',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];

export default LibraryRoutes;
