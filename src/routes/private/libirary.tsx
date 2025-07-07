import { lazy } from 'react';
import { IRoute } from '@/types';

const ProductCategory = lazy(() => import('@/pages/library/product-category'));
const Product = lazy(() => import('@/pages/library/product'));
const Client = lazy(() => import('@/pages/library/client'));
const Vendor = lazy(() => import('@/pages/library/vendor'));
const Loan = lazy(() => import('@/pages/library/loan'));
const LoadPaid = lazy(() => import('@/pages/library/loan/loan-paid'));

const LibraryRoutes: IRoute[] = [
	{
		name: 'Library',
		children: [
			{
				name: 'Product Category',
				path: '/lib/product-category',
				element: <ProductCategory />,
				page_name: 'lib__product_category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Product',
				path: '/lib/product',
				element: <Product />,
				page_name: 'lib__product',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Client',
				path: '/lib/client',
				element: <Client />,
				page_name: 'lib_client',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Vendor',
				path: '/lib/vendor',
				element: <Vendor />,
				page_name: 'lib_vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Loan',
				path: '/lib/loan',
				element: <Loan />,
				page_name: 'lib__loan',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Loan Paid',
				path: '/lib/loan/:uuid/paid',
				element: <LoadPaid />,
				hidden: true,
				page_name: 'lib__loan_paid',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];

export default LibraryRoutes;
