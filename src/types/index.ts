import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RouteObject } from 'react-router-dom';

export type IAuthResponse = {
	status: number;
	type: string;
	message: string;
	token: string;
	user: IUser;
	can_access: { [key: string]: string };
};

export type IToast = {
	toastType: 'create' | 'insert' | 'delete' | 'error' | 'warning' | 'update' | string;
	message: string;
};

// export type IResponse<T> = {
// 	data: T;
// };

export type IParams = {
	start_date?: Date | string | undefined;
	end_date?: Date | string | undefined;
	status?: boolean | undefined;
};

export type IStartEndDateProps = {
	start_date: Date | undefined;
	end_date: Date | undefined;
};

export type IUser = {
	uuid: string;
	auth_user_uuid: string;
	name: string;
	department: string;
};

export type IRoute = RouteObject & {
	name: string;
	children?: IRoute[];
	hidden?: boolean;
	page_name?: string;
	actions?: string[];
	disableCollapse?: boolean;
	page_type?: {
		type: 'library' | 'entry' | 'update' | 'normal' | 'custom';
		name: string;
	};
};

export type ITableFacetedFilter = {
	id: string;
	title: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};

export type ITableAdvanceFilter = {
	state: boolean | undefined;
	label: string;
	onStateChange: () => void;
	clear: () => void;
};

export type IToolbarOptions =
	| 'all'
	| 'all-filter'
	| 'view'
	| 'date-range'
	| 'faceted-filter'
	| 'advance-filter'
	| 'export-csv'
	| 'export-pdf'
	| 'refresh'
	| 'new-entry'
	| 'other';

export type IDeleteModal = {
	id: string;
	name: string;
} | null;

export type IPaginationQuery = {
	page: string;
	limit: string;
	orderby: 'asc' | 'desc';
	sort: string;
	q: string;
	start_date: string | undefined;
	end_date: string | undefined;
	[key: string]: string | number | undefined;
};

export type IPagination = {
	total_record: number;
	current_page: number;
	total_page: number;
	next_page: number | null;
	prev_page: number | null;
};
export type IResponse<T> = {
	toast: IToast;
	data: T;
	pagination: IPagination;
};
export type ITableFilterOptionSSR<T> = {
	accessor: keyof T;
	label: string;
	type: 'select' | 'checkbox' | 'radio' | 'date-range' | 'date' | 'text';
	apiUrl?: string;
	isPinned?: boolean;
};

export interface IDefaultAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
export interface IDefaultImageAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;

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

export interface IDefaultFileAddOrUpdateProps extends IDefaultAddOrUpdateProps {
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
