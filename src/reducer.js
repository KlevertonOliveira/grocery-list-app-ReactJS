export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  CLEAR_ALL: 'CLEAR_ALL',
  CLOSE_ALERT: 'CLOSE_ALERT',
  EDIT_ITEM: 'EDIT_ITEM',
  INVALID_INPUT: 'INVALID_INPUT',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_DISABLED_STATUS: 'TOGGLE_DISABLED_STATUS',
  TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
};

export function reducer(state, action){
  switch(action.type){
    
    case ACTIONS.ADD_ITEM:
      const newList = [...state.list, action.payload.newItem]
      return{
        ...state,
        list: newList,
        isAlertDisplayed: true,
        alertType: 'success',
        alertContent: 'Item successfully added!'
      };
    
    case ACTIONS.CLEAR_ALL:
      return {
        ...state,
        list: [],
        isEditing: false,
        editID: null,
        isAlertDisplayed: true,
        alertType: 'danger',
        alertContent: 'Empty list!'
      };
    
    case ACTIONS.CLOSE_ALERT:
      return{
        ...state,
        isAlertDisplayed: false
      };
    
    case ACTIONS.EDIT_ITEM:
      const editedList = state.list.map((item)=>{
        const {id, name, amount, kg} = action.payload;
        if(item.id === id) return {...item, name, amount, kg}
        return item;
      });

      return {
        ...state,
        list: editedList,
        isEditing: false,
        editID: null,
        isAlertDisplayed: true,
        alertType: 'success',
        alertContent: 'Value changed!'
      };
    

    case ACTIONS.INVALID_INPUT:
      return{
        ...state,
        isAlertDisplayed: true,
        alertType: 'danger',
        alertContent: action.payload.msg
      };
    
    
    case ACTIONS.REMOVE_ITEM:
      const listAfterRemoval = state.list.filter((item)=> item.id !== action.payload.id);
      return {
        ...state,
        list: listAfterRemoval,
        isAlertDisplayed: true,
        alertType: 'danger',
        alertContent: 'Item removed!'
      };

    case ACTIONS.TOGGLE_DISABLED_STATUS:
      return{
        ...state,
        amountDisabledStatus: !state.amountDisabledStatus,
        kgDisabledStatus: !state.kgDisabledStatus,
        lock: action.payload.number
      };

    case ACTIONS.TOGGLE_EDIT_MODE:
      return{
        ...state,
        isEditing: true,
        editID: action.payload.id
      };
    
    default:
      return state;
  }
}