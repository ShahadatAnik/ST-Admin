import { lazy } from 'react';
import { IRoute } from '@/types';

const ProductCategory = lazy(() => import('@/pages/library/product-category'));
const Product = lazy(() => import('@/pages/library/product'));
const Client = lazy(() => import('@/pages/library/client'));
const Vendor = lazy(() => import('@/pages/library/vendor'));
const Loan = lazy(() => import('@/pages/library/loan'));
const LoadPaid = lazy(() => import('@/pages/library/loan/loan-paid'));
const LoadDetails = lazy(() => import('@/pages/library/loan/details'));
const Job = lazy(() => import('@/pages/library/job'));
const JobEntry = lazy(() => import('@/pages/library/job/entry'));
const Expense = lazy(() => import('@/pages/library/expanse'));
const ProfitSummary = lazy(() => import('@/pages/report/profit-summery'));
const ProductDatabase = lazy(() => import('@/pages/report/product-database'));
// const Payment = lazy(() => import('@/pages/library/job/payment/entry'));

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
				page_name: 'lib__client',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Vendor',
				path: '/lib/vendor',
				element: <Vendor />,
				page_name: 'lib__vendor',
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
			{
				name: 'Loan Details',
				path: '/lib/loan/:uuid/details',
				element: <LoadDetails />,
				hidden: true,
				page_name: 'lib__loan_details',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Expense',
				path: '/lib/expense',
				element: <Expense />,
				page_name: 'lib__expense',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Job',
				path: '/lib/job',
				element: <Job />,
				page_name: 'lib__job',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Job Create',
				path: '/lib/job/create',
				element: <JobEntry />,
				page_name: 'lib__job_create',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Job Update',
				path: '/lib/job/:uuid/update',
				element: <JobEntry />,
				page_name: 'lib__job_update',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Profit Summary',
						path: '/lib/profit-summary',
						element: <ProfitSummary />,
						page_name: 'lib__profit_summary',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Product Database',
						path: '/lib/product-database',
						element: <ProductDatabase />,
						page_name: 'lib__product_database',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
			// {
			// 	name: 'Job Payment',
			// 	path: '/lib/job/:uuid/payment',
			// 	element: <Payment />,
			// 	page_name: 'lib__job_payment',
			// 	actions: ['create', 'read', 'update', 'delete'],
			// 	hidden: true,
			// },
		],
	},
];

export default LibraryRoutes;
