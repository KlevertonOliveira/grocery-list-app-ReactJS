import React, {useEffect, useState} from 'react';
import Alert from './components/Alert';
import List from './components/List';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list) return (list = JSON.parse(list));
  return [];
}

function App() {

  const [list, setList] = useState(getLocalStorage);
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [kg, setKg] = useState(0);
  
  const [amountDisabledStatus, setAmountDisabledStatus] = useState(false);
  const [kgDisabledStatus, setKgDisabledStatus] = useState(true);
  const [lock, setLock] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const [alert, setAlert] = useState({show:false, type:'', msg:''})
  
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!name || (!amount && !kg)){
      showAlert(true, 'danger', 'Please, make sure all fields are correctly filled!');
    }

    else if(name && (amount || kg) && isEditing){

      setList(
        list.map((item)=>{
        if(item.id === editID){
          return {...item, name, amount, kg}
        }
        return item;
        })
      );
      
      setName('');
      toggleDisabledStatus(1);
      setAmount(1);
      setKg(0);
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed!');
    }
    
    else{
      const newItem = {id: new Date().getTime().toString(), name, amount, kg};
      setList([...list, newItem]);
      setName('');
      setAmount(0);
      setKg(0);
      showAlert(true, 'success', 'Item successfully added!');
    }
  }

  const deleteItem = (id) =>{
    setList(list.filter((item)=> item.id !== id))
    showAlert(true, 'danger', 'Item removed!');
  }
  
  const editItem = (id) =>{
    const item = list.find((item)=>item.id === id);
    setName(item.name);
    
    if(item.amount > 0){
      toggleDisabledStatus(1);
      setAmount(item.amount);
    }

    if(item.kg > 0){
      toggleDisabledStatus(2);
      setKg(item.kg);
    }

    setEditID(id);
    setIsEditing(true);
    
  }

  const showAlert = (show=false, type='', msg='') =>{
    setAlert({show, type, msg});
  }

  const clearAll = () =>{
    setList([]);
    showAlert(true, 'danger', 'Empty list!');
    if(isEditing) setIsEditing(false);
    if(name) setName('');
    if(amount) setAmount(0);
    if(kg) setKg(0);
  }

  const toggleDisabledStatus = (number) =>{
    if(number !== lock){
      setAmountDisabledStatus(!amountDisabledStatus);
      setKgDisabledStatus(!kgDisabledStatus);
      
      if(number === 1){
        setAmount(1);
        setKg(0);
      }else{
        setAmount(0);
        setKg(1);
      }
      setLock(number);
    }
  }
  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])


  return (
    <main className="container">
      
      <div className="form-control">

        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert}></Alert>}
        <h1>Grocery List</h1>
        
        <form action="">
          
          <div className="form__name-container">
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

          <div className="form__amount-container">
            <div>         
              <input 
                type="checkbox"
                checked={!amountDisabledStatus}
                onClick={()=>toggleDisabledStatus(1)}
              />
              <label htmlFor="amount"> Amount: </label>
              <input
                className={amountDisabledStatus && `disabled`}
                type="number"
                id="amount"
                name="amount"
                min="1"
                disabled={amountDisabledStatus}
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
                <input 
                  type="checkbox"
                  checked={!kgDisabledStatus}
                  onClick={()=>toggleDisabledStatus(2)}
                />
                <label htmlFor="kg"> Kg: </label>
                <input
                  className={kgDisabledStatus && `disabled`}
                  type="number"
                  id="kg"
                  name="kg"
                  min="1"
                  disabled={kgDisabledStatus}
                  value={kg}
                  onChange={(e)=>setKg(e.target.value)}
                  placeholder="0"
                />
            </div>
          </div>
        </form>
          <button
            className="submit-btn" 
            type="submit"
            onClick={handleSubmit}
            >
            {isEditing?"Edit":"Submit"}
          </button>
      </div>

        {list.length > 0 && 
          <div className="list-container">
            <List list={list} deleteItem={deleteItem} editItem={editItem}></List>
            <div className="clear-all">
              <button type="button" className="clear-btn" onClick={clearAll}>Clear all</button>
            </div>
          </div>
        }
    </main>
  );
}

export default App;