export const libQK = {
	all: () => ['lib'],

	//* expanse
	expanse: () => [...libQK.all(), 'expanse'],
	expanseByUUID: (uuid: string) => [...libQK.expanse(), uuid],
};
