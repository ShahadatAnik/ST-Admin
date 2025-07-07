import useTQuery from '@/hooks/useTQuery';

import otherQK from './query-keys';

//* GET OTHER HR
export const useOtherHR = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.hr(),
		url: `/other/hr/value/label`,
	});

//* GET OTHER DEPARTMENT
export const useOtherDepartment = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.department(),
		url: `/other/hr/department/value/label`,
	});

//* GET OTHER Designation
export const useOtherDesignation = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.designation(),
		url: `/other/hr/designation/value/label`,
	});

//* GET OTHER USER
export const useOtherUser = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.user(),
		url: `/other/hr/users/value/label`,
	});
//* GET OTHER USER BY QUERY
export const useOtherUserQuery = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: otherQK.userByQuery(query),
		url: `/other/hr/users/value/label?${query}`,
	});
//// ? LIBRARY GLOBAL QUERIES ? ////
//* GET OTHER PRODUCT CATEGORY
export const useOtherProductCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.productCategory(),
		url: `/other/lib/product-category/value/label`,
	});

// * GET OTHER PRODUCT
export const useOtherProduct = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.product(query ? query : ''),
		url: query ? `/other/lib/product/value/label?${query}` : `/other/lib/product/value/label`,
	});

//* GET OTHER CLIENT
export const useOtherClient = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.client(query ? query : ''),
		url: query ? `/other/lib/client/value/label?${query}` : `/other/lib/client/value/label`,
	});

// * GET OTHER VENDOR
export const useOtherVendor = <T>(query: string = '') =>
	useTQuery<T>({
		queryKey: otherQK.vendor(query),
		url: query ? `/other/lib/vendor/value/label?${query}` : `/other/lib/vendor/value/label`,
	});

//* GET OTHER JOB
export const useOtherJob = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.job(query ? query : ''),
		url: query ? `/other/lib/job/value/label?${query}` : `/other/lib/job/value/label`,
	});
