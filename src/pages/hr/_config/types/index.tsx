import { IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { AxiosError } from 'axios';

import {
	IDepartmentTableData,
	IDesignationTableData,
	IPageAssign,
	IResetPassword,
	IUserTableData,
} from '../columns/columns.type';

//* user

export type UserColumnProps = {
	statusAccess: boolean;
	resetPasswordAccess: boolean;
	pageAssignAccess: boolean;
	handleStatus: (row: Row<any>) => void;
	handleResetPassword: (row: Row<any>) => void;
	handlePageAssign: (row: Row<any>) => void;
};

export interface IUserAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IUserTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	imagePostData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	imageUpdateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
export interface IAuthAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IUserTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export interface IPageAssignProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPageAssign | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IPageAssign | null>>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export interface IResetPasswordProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IResetPassword | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IResetPassword | null>>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}
//* department
export interface IDepartmentAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IDepartmentTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

//* designation
export interface IDesignationAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IDesignationTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
	postData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
	updateData: UseMutationResult<
		IToast,
		AxiosError<IToast, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

export type usersWithAccess = { value: string; label: string; can_access: string };
