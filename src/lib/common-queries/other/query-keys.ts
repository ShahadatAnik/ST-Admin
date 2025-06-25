const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],

	//* Department
	department: () => [...otherQK.all(), 'department'],

	//* Designation
	designation: () => [...otherQK.all(), 'designation'],

	//* Faculty
	faculty: () => [...otherQK.all(), 'faculty'],

	//* User
	user: () => [...otherQK.all(), 'user'],

	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],

	//* Teachers
	teachers: () => [...otherQK.all(), 'teachers'],

	//* Programs
	programs: () => [...otherQK.all(), 'programs'],
	//* Departments
	departments: (query: string) => [...otherQK.all(), 'departments', ...(query ? [query] : [])],

	//* Category
	category: () => [...otherQK.all(), 'category'],

	//* Sub Category
	subCategory: () => [...otherQK.all(), 'subCategory'],

	//* Purchase Cost Center
	purchaseCostCenter: () => [...otherQK.all(), 'purchaseCostCenter'],
	//* Sub Purchase Cost Center
	subPurchaseCostCenter: () => [...otherQK.all(), 'subPurchaseCostCenter'],

	//* Vendor
	vendor: (query: string) => [...otherQK.all(), 'vendor', ...(query ? [query] : [])],

	//* Internal Cost Center
	internalCostCenter: () => [...otherQK.all(), 'internalCostCenter'],
	//* Item
	item: () => [...otherQK.all(), 'item'],

	// * Course
	course: () => [...otherQK.all(), 'course'],

	// * Semester
	semester: () => [...otherQK.all(), 'semester'],
	//* Question Category
	questionCategory: () => [...otherQK.all(), 'questionCategory'],
	//* Requested Items
	requestedItems: (query: string) => [...otherQK.all(), 'requestedItems', ...(query ? [query] : [])],
	//*ITem Work Order
	itemWorkOrder: (query: string) => [...otherQK.all(), 'itemWorkOrder', ...(query ? [query] : [])],
	//* Bank
	bank: () => [...otherQK.all(), 'bank'],
	//*bill
	bill: (query: string) => [...otherQK.all(), 'bill', ...(query ? [query] : [])],
};

export default otherQK;
