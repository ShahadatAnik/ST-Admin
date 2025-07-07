import { lazy } from 'react';
import { IRoute } from '@/types';

const ProductCategory = lazy(() => import('@/pages/library/product-category'));
const Product = lazy(() => import('@/pages/library/product'));
const Client = lazy(() => import('@/pages/library/client'));
const Vendor = lazy(() => import('@/pages/library/vendor'));
const Job = lazy(() => import('@/pages/library/job'));
const JobEntry = lazy(() => import('@/pages/library/job/entry'));

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
				name: 'Job',
				path: '/lib/job',
				element: <Job />,
				page_name: 'lib_job',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Job Create',
				path: '/lib/job/create',
				element: <JobEntry />,
				page_name: 'lib_job_create',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Job Update',
				path: '/lib/job/:uuid/update',
				element: <JobEntry />,
				page_name: 'lib_job_update',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
		],
	},
];

export default LibraryRoutes;
