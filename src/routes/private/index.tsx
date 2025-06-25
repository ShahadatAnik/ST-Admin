import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './hr';
import ProfileRoutes from './profile';

const privateRoutes: IRoute[] = [...HrRoutes, ...ProfileRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
