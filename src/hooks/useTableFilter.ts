import { useContext } from 'react';
import { TableFilterContext } from '@/context/TableFilterContext';

const useTableFilter = () => {
	const context = useContext(TableFilterContext);

	if (!context) {
		throw new Error('useTableFilter must be used within an TableFilterProvider');
	}

	return context;
};

export default useTableFilter;
