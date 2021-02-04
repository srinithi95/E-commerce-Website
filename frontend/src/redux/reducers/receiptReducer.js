const DEFAULT_STATE = {
  note : '',
  notes : []
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'RECEIPT_SET_NOTE':
        return {
          ...state,
          receipt: action.receipt,
        };
      case 'RECEIPTS_SET_NOTES':
        return {
          ...state,
          receipts: action.receipts,
        };
    default:
      return state;
  }
};

export default notesReducer;