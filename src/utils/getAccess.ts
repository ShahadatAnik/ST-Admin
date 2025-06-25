const getAccess = (hasAccess: string[]) => {
	const exclude = ['create', 'read', 'update', 'delete'];

	const access = hasAccess.filter((item) => !exclude.includes(item));

	if (access.length === 0) return '';
	else return access.join(',');
};

export default getAccess;
