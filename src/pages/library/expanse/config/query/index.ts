import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Expanse
export const useLibExpanse = <T>() =>
	useTQuery<T>({
		queryKey: libQK.expanse(),
		url: '/lib/expanse',
	});

export const useLibExpanseByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.expanseByUUID(uuid),
		url: `/lib/expanse/${uuid}`,
		enabled: !!uuid,
	});
