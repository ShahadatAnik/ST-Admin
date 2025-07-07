import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import LibraryRoutes from './libirary';
import ProfileRoutes from './profile';

const privateRoutes: IRoute[] = [...HrRoutes, ...ProfileRoutes, ...LibraryRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
