export const setReceipt = receipt => ({
    type: 'RECEIPT_SET_RECEIPT',
    receipt,
  });
  
  export const setReceipts = receipts => ({
    type: 'RECEIPTS_SET_RECEIPTS',
    receipts,
  });

  export const displayReceipts = () => (dispatch, getState) => {
    const userName = getState().userReducer.user;
    const pass= getState().userReducer.password;
    const url = '/api/receipts/get';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ userId: userName, password:pass}),
    }
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => {
        dispatch(setReceipts(data));
      })
      .catch(console.log);
  };

  export const saveReceipt = () => (dispatch, getState) => {
    const userName = getState().userReducer.user;
    const newReceipt = getState().receiptReducer.receipt;
    const pass= getState().userReducer.password;
    const url = '/api/receipt/create';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ userId: userName, receipt: newReceipt, password:pass}),
    } 
    //console.log(requestOptions);
    fetch(url, requestOptions)
      .then(dispatch(setReceipt('')))
      .catch((error) => console.log(error));
  };