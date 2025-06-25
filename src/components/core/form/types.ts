import React from 'react';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { OTPInputProps } from 'input-otp';
import { DayPickerProps } from 'react-day-picker';
import { DropzoneOptions } from 'react-dropzone';
import { ControllerFieldState, ControllerRenderProps, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

import { InputProps } from '@/components/ui/input';
import { TextareaProps } from '@/components/ui/textarea';

interface IFieldProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	disableLabel?: boolean;
	disabled?: boolean;
}

// * form-textarea
export interface FormTextareaProps extends IFieldProps, TextareaProps {}

// * form-select
export interface IFormSelectOption {
	label: string | number;
	value: string | number;
	unit?: string;
}

// * form-section
export interface IFormSectionProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
	extraHeader?: React.ReactNode;
}

export interface FormSelectProps extends IFieldProps {
	options: IFormSelectOption[];
	valueType?: 'string' | 'number';
	isDisabled?: boolean;
}

// * form-react-select
export interface FormReactSelectProps extends IFieldProps {
	options: IFormSelectOption[];
	unique?: boolean;
	excludeOptions?: string[];
	isMulti?: boolean;
	menuPortalTarget?: any;
	valueType?: 'string' | 'number';
	isDisabled?: boolean;
	value?: any;
	onChange?: (option?: any, field?: any) => void;
}

// * form-multi-select
export interface FormMultiSelectProps extends IFieldProps {
	isDisabled?: boolean;
	options: IFormSelectOption[];
}

// * form-join-input-unit
export interface FormJoinInputUnitProps extends IFieldProps, InputProps {
	icon?: React.ReactNode;
	unit: string;
}

// * form-join-input-select
export interface FormJoinInputSelectProps extends IFieldProps, InputProps {
	icon?: React.ReactNode;
	selectField: {
		name: string;
		options: IFormSelectOption[];
		isDisabled?: boolean;
	};
}

// * form-input
export interface FormInputProps extends IFieldProps, InputProps {
	icon?: React.ReactNode;
}
// * form-phone
export type FormOtpProps = Omit<OTPInputProps, 'children'> & {
	field: ControllerRenderProps<any, any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	disableLabel?: boolean;
	disabled?: boolean;
	labelClassName?: string;
};

// * form-file-upload
export interface FormFileUploadProps extends IFieldProps, InputProps {
	options?: DropzoneOptions;
	isUpdate?: boolean;
	fileType?: 'image' | 'document' | 'all' | 'video' | 'audio';
	errorText?: string;
}

// * form-date-picker
export interface FormDatePickerProps extends IFieldProps {
	icon?: React.ReactNode;
	className?: string;
	calendarProps?: DayPickerProps;
}

// * form-checkbox
export interface FormCheckboxProps extends IFieldProps, CheckboxProps {
	icon?: React.ReactNode;
	labelClassName?: string;
	isBoxed?: boolean;
}

// * form-radio
export interface FormRadioProps extends IFieldProps, RadioGroupProps {
	options: IFormSelectOption[];
}

// * form-switch
export interface FormSwitchProps extends IFieldProps, CheckboxProps {
	icon?: React.ReactNode;
	labelClassName?: string;
	isBoxed?: boolean;
}

// * form-add-edit-wrapper
export interface IFormAddEditWrapperProps {
	children: React.ReactNode;
	form: UseFormReturn<any, any, undefined>;
	onSubmit(values: any): void;
	title?: string;
}

// * file upload
export interface FormFileUploadProps extends IFieldProps {
	className?: string;
	accept?: string;
	multiple?: boolean;
}
