const initialState = {
	inventory: []
}

export default (state = initialState, action) => {
	switch (action.type) {

		case 'INVENTORY_SET_INVENTORY':
			return {
				...state,
				inventory: action.inventory
			}

		default:
			return state
	}
}
