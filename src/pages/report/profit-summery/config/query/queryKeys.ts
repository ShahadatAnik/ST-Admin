export const libQK = {
	all: () => ['lib'],

	//* Profit summary
	profitSummary: () => [...libQK.all(), 'profit-summary'],
	expanseByUUID: (uuid: string) => [...libQK.profitSummary(), uuid],
};
