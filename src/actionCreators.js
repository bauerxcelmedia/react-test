export const addList = (items) => {
	return {
		type: 'ADD_LIST',
		items
	};
};

export const previousPage = () => {
	return {
		type: 'PREVIOUS_PAGE'
	};
};

export const nextPage = () => {
	return {
		type: 'NEXT_PAGE'
	};
};

export const setPage = (pageNumber) => {
	return {
		type: 'SET_PAGE',
		pageNumber
	};
};

export const setSelectedItem = (id) => {
	return {
		type: 'SET_SELECTED_ITEM',
		id
	};
};

export const toggleItemSelection = (id) => {
	return {
		type: 'TOGGLE_ITEM_SELECTION',
		id
	};
};