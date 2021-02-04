import { setReceipts } from "./receiptActions";

export const setUser = user => ({
	type: 'USER_SET_USER',
	user,
});

export const setPassword = password => ({
	type: 'USER_SET_PASSWORD',
	password,
});
export const setEmail = email =>({
	type : 'USER_SET_EMAIL',
	email,
})

export const setIsLoggedIn = isLoggedIn => ({
	type: 'USER_SET_IS_LOGGED_IN',
	isLoggedIn,
});

export const setLoadingState = loadingState => ({
	type: 'USER_SET_LOADING_STATE',
	loadingState,
});

export const setCart = cart => ({
	type: 'USER_SET_CART',
	cart,
})

export const setActiveUsers = activeUsers =>({
	type:'SET_ACTIVE_USERS',
	activeUsers,
})
export const setNotifications = notification =>({
	type:'SET_ACTION_NOTIFICATION',
	notification,
})


export const setUserType = userType => ({
	type: 'USER_SET_USERTYPE',
	userType,
});

export const login = () => (dispatch, getState) => {
	//console.log('login function');
	const reduxEvent = setLoadingState('loading'); // regular object
	//console.log(reduxEvent);
	// in order for redux to know something happened
	dispatch(reduxEvent); // now redux knows something is happening
	const userEmail = getState().userReducer.email;
	const userPassword = getState().userReducer.password;
	const url = '/api/auth/authenticate';
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: userEmail, password: userPassword }),
	}
	fetch(url, requestOptions)
		.then(res => res.json())
		.then(data => {
			//console.log('here');
			if (data.valid) {
				console.log(data);
				dispatch(setUser(data.userName));
				dispatch(setPassword(''));
				dispatch(setIsLoggedIn(true));
				dispatch(setLoadingState('init'));
				dispatch(setUserType(data.userType))
			} else {
				dispatch(setLoadingState('error'));
			}
		})
		.catch(console.log);
};

export const logout = () => (dispatch, getState) => {
	dispatch(setIsLoggedIn(false));
	dispatch(setUser(''));
	dispatch(setPassword(''));
	dispatch(setEmail(''));
	dispatch(setReceipts([]));
	dispatch(setCart([]))
	dispatch(setNotifications(''))
};

export const create = () => (dispatch, getState) => {
	const reduxEvent = setLoadingState('loading'); // regular object
	console.log(reduxEvent);
	// in order for redux to know something happened
	dispatch(reduxEvent); // now redux knows something is happening
	const userName = getState().userReducer.user;
	const userPassword = getState().userReducer.password;
	const useremail= getState().userReducer.email;
	const userType = getState().userReducer.userType;
	if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(useremail)){
	    dispatch(setLoadingState('Not'))
	}
	else{
	const url = '/api/auth/create';
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: userName, password: userPassword, email: useremail, userType: userType}),
	}
	fetch(url, requestOptions)
		.then(res => res.json())
		.then(data => {
			if (data.valid) {
				dispatch(setUser(''));
				dispatch(setPassword(''));
				dispatch(setLoadingState('init'));
			} else {
				dispatch(setLoadingState('error'));
			}
		})
		.catch(console.log);
}};

export const addToCart = amount => (dispatch, getState) => {
	const cart = getState().userReducer.cart
	const newItem = getState().itemReducer.item
	const inventory = getState().inventoryReducer.inventory
	const stock = inventory.find((value, index, array) => {
		return value.title === newItem.title
	}).stock
	const index = cart.findIndex((value, index, array) => {
		return value.item.title === newItem.title
	})
	if (index === -1) {
		cart.push({
			amount: parseInt(amount),
			item: newItem
		})
	} else {
		if (cart[index].amount + parseInt(amount) > stock) {
			cart[index].amount = stock
		} else {
			cart[index].amount += parseInt(amount)
		}
	}
	dispatch(setCart(cart))
}

export const deleteFromCart = cartItem => (dispatch, getState) => {
	const cart = getState().userReducer.cart
	const index = cart.findIndex(value => {
		return value.item._id === cartItem.item._id
	})
	console.log(cartItem);
	dispatch(setCart(cart.slice(0, index).concat(cart.slice(index + 1))))
}

export const completeTransaction = () => (dispatch, getState) => {
	console.log('called complete transactio function.')
	const email = getState().userReducer.email;
	const url = '/api/receipts/create';
	const cart = getState().userReducer.cart;
	console.log(cart);
	console.log(email);
	const jsonCart = [];
	cart.forEach(element => {
		jsonCart.push({title : element.item.title , quantity : element.amount})
	});
	

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json'},
		body: JSON.stringify({receipt_id : '22',
								date : Date.now(),
								price: '$22.22',
								items: jsonCart	,
								email: email
		})
	}
	

	fetch(url, requestOptions)
		.then(res => res.json())
		.then(data => {
			console.log(data);
		})
		.catch( (e) => {
			//console.log(e);
		})
		
};