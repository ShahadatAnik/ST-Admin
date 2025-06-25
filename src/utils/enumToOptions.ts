import { IFormSelectOption } from '@/components/core/form/types';

function enumToOptions(enumeration: any): IFormSelectOption[] {
	return Object.entries(enumeration).map(([key, value]) => ({
		label: key.replace(/(?:^|_)([a-zA-Z])/g, (_, letter) => ' ' + letter.toUpperCase()).trim(),
		value,
	})) as IFormSelectOption[];
}

export default enumToOptions;
