import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { clientQK } from './queryKeys';

// * User
export const useClient = <T>() =>
	useTQuery<T>({
		queryKey: clientQK.client(),
		url: '/lib/client',
	});

export const useClientByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: clientQK.clientByUUID(uuid),
		url: `/lib/client/${uuid}`,
		enabled: !!uuid,
	});
