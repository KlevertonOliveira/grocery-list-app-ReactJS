import React, {useEffect, useReducer, useState} from 'react';
import Alert from './components/Alert';
import List from './components/List';
import { ACTIONS, reducer } from './reducer';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list) return (list = JSON.parse(list));
  return [];
}

const initialState = {
  list: getLocalStorage(),
  amountDisabledStatus: false,
  kgDisabledStatus: true,
  lock: 1,
  isEditing: false,
  editID: null,
  isAlertDisplayed: false,
  alertType: '',
  alertContent: ''
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [kg, setKg] = useState(0);

  const setAllToInitialConfigs = () =>{
    toggleDisabledStatus(1);
    setName('');
    setAmount(1);
    setKg(0);
  };

  const inputValidation = (e) =>{
    let value = e.target.value;
    
    if(value == 0){
      dispatch(
        {type: ACTIONS.INVALID_INPUT, 
         payload: {msg:'Only values above 0 are allowed!'}});
    }

    else{
      state.lock === 1? setAmount(value) : setKg(value);
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!name){
      dispatch(
        {type: ACTIONS.INVALID_INPUT, 
         payload: {msg:'Please, make sure all fields are correctly filled!'}});
    }

    else if(name && state.isEditing){
      dispatch({type:ACTIONS.EDIT_ITEM, payload:{id:state.editID, name, amount, kg}});
      setAllToInitialConfigs();
    }
    
    else{
      const newItem = {id: new Date().getTime().toString(), name, amount, kg};
      dispatch({type:ACTIONS.ADD_ITEM, payload:{newItem}});
      setAllToInitialConfigs();
    }
  };
  
  const editItem = (id) =>{
    const item = state.list.find((item)=>item.id === id);
    setName(item.name);
    
    if(item.amount > 0){
      toggleDisabledStatus(1);
      setAmount(item.amount);
    }

    else{
      toggleDisabledStatus(2);
      setKg(item.kg);
    }

    dispatch({type:ACTIONS.TOGGLE_EDIT_MODE, payload:{id}});
  };

  const clearAll = () =>{
    dispatch({type:ACTIONS.CLEAR_ALL});
    setAllToInitialConfigs();
  };

  const toggleDisabledStatus = (number) =>{
    if(number !== state.lock){
      
      if(number === 1){
        setAmount(1);
        setKg(0);
      }else{
        setAmount(0);
        setKg(1);
      }
  
      dispatch({type:ACTIONS.TOGGLE_DISABLED_STATUS, payload:{number}})
    }
  };
  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list));
  }, [state.list])


  return (
    <main className="container">

        <div className="align-center">
          {state.isAlertDisplayed && 
            <Alert 
              dispatch={dispatch} 
              list={state.list} 
              type={state.alertType} 
              msg={state.alertContent}>
            </Alert>
          }
          <h1>Grocery List</h1>
        </div>
        
        <form action="">
          
          <div className="form__name-container align-center">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="e.g. banana"
            />
          </div>

          <div className="form__quantity-container">
            <div>         
              <input 
                type="checkbox"
                checked={!state.amountDisabledStatus}
                onClick={()=>toggleDisabledStatus(1)}
              />
              <label htmlFor="amount"> Amount: </label>
              <input
                className={`${state.amountDisabledStatus && 'disabled'}`}
                type="number"
                id="amount"
                name="amount"
                min='1'
                disabled={state.amountDisabledStatus}
                value={amount}
                onChange={inputValidation}
                placeholder="1"
              />
            </div>
            <div>
                <input 
                  type="checkbox"
                  checked={!state.kgDisabledStatus}
                  onClick={()=>toggleDisabledStatus(2)}
                />
                <label htmlFor="kg"> Kg: </label>
                <input
                  className={`${state.kgDisabledStatus && 'disabled'}`}
                  type="number"
                  id="kg"
                  name="kg"
                  min="1"
                  disabled={state.kgDisabledStatus}
                  value={kg}
                  onChange={inputValidation}
                  placeholder="1"
                />
            </div>
          </div>
        </form>
        <div className="submit align-center">
          <button
            className="submit-btn" 
            type="submit"
            onClick={handleSubmit}
            >
            {state.isEditing?"Edit item":"Add item"}
          </button>
        </div>

        {state.list.length > 0 && 
          <div className="list-container">
            <List 
              list={state.list} 
              dispatch={dispatch} 
              editItem={editItem}>         
              </List>
            <div className="clear-all align-center">
              <button type="button" className="clear-btn" onClick={clearAll}>Clear all</button>
            </div>
          </div>
        }
    </main>
  );
}

export default App;
