import { ToWords } from 'to-words';

const toWords = new ToWords({
	localeCode: 'en-US',
});

export const NumToWord = (number: number) => toWords.convert(number);

const dollarToWords = new ToWords({
	localeCode: 'en-US',
});
const takaToWords = new ToWords({
	localeCode: 'en-BD',
});

export const DollarToWord = (number: number) =>
	dollarToWords.convert(number, { currency: true, ignoreZeroCurrency: true });
export const TakaToWord = (number: number) => takaToWords.convert(number, { currency: true, ignoreZeroCurrency: true });
