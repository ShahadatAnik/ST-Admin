export const libQK = {
	all: () => ['lib'],

	//* library
	product: () => [...libQK.all(), 'product'],
	productByUUID: (uuid: string) => [...libQK.product(), uuid],
};
