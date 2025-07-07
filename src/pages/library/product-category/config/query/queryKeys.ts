export const libQK = {
	all: () => ['lib'],

	//* Product Category
	productCategory: () => [...libQK.all(), 'product-category'],
	productCategoryByUUID: (uuid: string) => [...libQK.productCategory(), uuid],
};
