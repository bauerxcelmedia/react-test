export const INITIAL_STATE = null;

export function toggleItemSelection(state, id) {
	return state !== id ? id : null;        // Not currently selected
}

export function setSelectedItem(state, id) {
	return id;
}