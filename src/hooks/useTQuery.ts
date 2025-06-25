import { IToast } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { api, image_api } from '@/lib/api';

interface IUseTQuery {
	queryKey: (string | number | boolean | Date | undefined)[];
	url: string;
	enabled?: boolean;
}

interface IPost {
	url: string;
	newData: any;
	isOnCloseNeeded?: boolean;
	onClose?: () => void;
}
interface IUpdate {
	url: string;
	updatedData: any;
	isOnCloseNeeded?: boolean;
	onClose?: () => void;
}

const useTQuery = <T>({ queryKey, url, enabled = true }: IUseTQuery) => {
	const queryClient = useQueryClient();

	const { data, isError, isLoading, isPending, refetch, isFetching, status } = useQuery<T>({
		queryKey,
		queryFn: () => api.get(url).then((res) => res.data),
		refetchInterval: false,
		refetchOnMount: false,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
		refetchIntervalInBackground: false,
		enabled,
	});

	const postData = useMutation({
		mutationFn: async ({ url, newData }: IPost) => {
			const response = await api.post<IToast>(url, newData);
			return response?.data;
		},
		onMutate: async ({ newData }) => {
			await queryClient.cancelQueries({ queryKey });
			return { newData };
		},

		onSuccess: (data) => {
			toast.success(data?.message);
		},

		onError: (error: AxiosError<IToast>, newUser, context) => {
			queryClient.setQueryData(queryKey, ({ data }: { data: [] }) =>
				data?.filter((item: any) => item.id !== context?.newData?.uuid)
			);
			console.error(error);
			toast.error(error?.response?.data?.message);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });

			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});
	const imagePostData = useMutation({
		mutationFn: async ({ url, newData }: IPost) => {
			const response = await image_api.post<IToast>(url, newData);
			return response?.data;
		},
		onMutate: async ({ newData }) => {
			await queryClient.cancelQueries({ queryKey });
			return { newData };
		},

		onSuccess: (data) => {
			toast.success(data?.message);
		},

		onError: (error: AxiosError<IToast>, newUser, context) => {
			queryClient.setQueryData(queryKey, ({ data }: { data: [] }) =>
				data?.filter((item: any) => item.id !== context?.newData?.uuid)
			);
			console.error(error);
			toast.error(error?.response?.data?.message);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });

			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});

	const updateData = useMutation({
		mutationFn: async ({ url, updatedData }: IUpdate) => {
			const response = await api.patch<IToast>(url, updatedData);
			return response.data;
		},
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey,
			});
			const previousData = queryClient.getQueryData(queryKey);
			return { previousData: previousData };
		},
		onSuccess: (data) => {
			toast.warning(data?.message);
		},
		onError: (error: AxiosError<IToast>, variables, context: any) => {
			queryClient.setQueryData(queryKey, context.previousData);
			console.log(error);
			toast.error(error?.response!.data?.message);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });
			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});
	const imageUpdateData = useMutation({
		mutationFn: async ({ url, updatedData }: IUpdate) => {
			const response = await image_api.patch<IToast>(url, updatedData);
			return response.data;
		},
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey,
			});
			const previousData = queryClient.getQueryData(queryKey);
			return { previousData: previousData };
		},
		onSuccess: (data) => {
			toast.warning(data?.message);
		},
		onError: (error: AxiosError<IToast>, variables, context: any) => {
			queryClient.setQueryData(queryKey, context.previousData);
			console.log(error);
			toast.error(error?.response!.data?.message);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });
			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});

	const deleteData = useMutation({
		mutationFn: async ({ url }: { url: string; isOnCloseNeeded?: boolean; onClose?: () => void }) => {
			const response = await api.delete<IToast>(url);
			return response.data;
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
		},
		onSuccess: (data) => {
			toast.error(data?.message);
		},
		onError: (error: AxiosError<IToast>) => {
			console.log(error);
			toast.error(error?.response!.data?.message);
		},
		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });
			variables?.onClose?.();
		},
	});

	return {
		url,
		data,

		// * States
		isLoading,
		isError,
		isPending,
		isFetching,
		status,

		// * Mutations
		imagePostData,
		imageUpdateData,
		updateData,
		postData,
		deleteData,

		// * Refetch
		refetch,
		invalidateQuery: () => queryClient.invalidateQueries({ queryKey }),
	};
};

export default useTQuery;
