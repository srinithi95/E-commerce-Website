export const setItem = item => ({
    type: 'ITEM_SET_ITEM',
    item
})

export const setInventory = inventory => ({
    type: 'INVENTORY_SET_INVENTORY',
    inventory
})

export const selectItem = index => (dispatch, getState) => {
    dispatch(setItem(getState().inventoryReducer.inventory[index]))
}

export const getInventory = () => (dispatch) => {
    const url = '/api/inventory/get';

    fetch(url)
        .then( res => res.json())
        .then( data => {
            dispatch(setInventory(data));
        })
        .catch(console.log);

};