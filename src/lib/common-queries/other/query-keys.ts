const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],

	//* Department
	department: () => [...otherQK.all(), 'department'],

	//* Designation
	designation: () => [...otherQK.all(), 'designation'],

	//* User
	user: () => [...otherQK.all(), 'user'],

	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],
	//* Vendor
	vendor: (query: string) => [...otherQK.all(), 'vendor', ...(query ? [query] : [])],
	//*product-category
	productCategory: () => [...otherQK.all(), 'product-category'],
	//*product
	product: (query: string) => [...otherQK.all(), 'product', ...(query ? [query] : [])],
	//*client
	client: (query: string) => [...otherQK.all(), 'client', ...(query ? [query] : [])],
	//*job
	job: (query: string) => [...otherQK.all(), 'job', ...(query ? [query] : [])],
};

export default otherQK;
