export const DEFAULT_FONT_SIZE = 11;
export const xMargin = 30;
export const yMargin = 40;
export const A4_PAGE_WIDTH = 565;

export const PRIMARY_COLOR = '#27374D';

// default style for all headers
export const defaultStyle = {
	fontSize: DEFAULT_FONT_SIZE,
};

// Styles
export const styles = {
	tableHeader: {
		fillColor: '#ced4da',
		color: '#000',
	},
	tableFooter: {
		margin: [0, 2],
		fillColor: '#c5c3c6',
		color: '#000',
	},
};

interface PdfText {
	text: string;
	bold?: boolean;
}

export const TitleAndValue = (title: string, value?: string | number): PdfText[] => [
	{
		text: `${title}: `,
		bold: true,
	},
	{
		text: `${value || '-'}\n`,
	},
];

export const tableLayoutStyle: {
	fillColor: (rowIndex: number, node: any, columnIndex: number) => string | null;
	fillOpacity: number;
	hLineWidth: (i: number) => number;
	vLineWidth: () => number;
	hLineColor: (i: number) => string;
} = {
	fillColor: (rowIndex: number, node: any, columnIndex: number): string | null => {
		if (rowIndex === 0) return null;
		return rowIndex % 2 === 0 ? '#d1d5db' : null;
	},
	fillOpacity: 0.5,
	hLineWidth: (i: number): number => (i === 0 ? 0 : 1),
	vLineWidth: (): number => 0,
	hLineColor: (i: number): string => (i === 1 ? PRIMARY_COLOR : '#d1d5db'),
};
export const customTable = {
	paddingTop: function () {
		return 5;
	},
	paddingBottom: function () {
		return 0;
	},
	paddingLeft: function () {
		return 0;
	},
	paddingRight: function () {
		return 0;
	},
	hLineWidth: function () {
		return 0;
	}, // Removes horizontal lines
	vLineWidth: function () {
		return 0;
	}, // Removes vertical lines
};
