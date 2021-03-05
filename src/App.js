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
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, type:'', msg:''})
  
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!name){
      showAlert(true, 'danger', 'Please, enter a value!');
    }

    else if(name && isEditing){

      setList(
        list.map((item)=>{
        if(item.id === editID){
          //item.title = name;
          return {...item, title:name}
        }
        return item;
        })
      );
      
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed!');
    }
    
    else{
      const item = {id: new Date().getTime().toString(), title: name};
      setList([...list, item]);
      setName('');
      showAlert(true, 'success', 'Item successfully added!');
    }
  }

  const deleteItem = (id) =>{
    setList(list.filter((item)=> item.id !== id))
    showAlert(true, 'danger', 'Item removed!');
  }
  
  const editItem = (id) =>{
    const item = list.find((item)=>item.id === id);
    setName(item.title);
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
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="e.g. banana"
            />
            <button
              className="submit-btn" 
              type="submit"
              onClick={handleSubmit}
              >
              {isEditing?"Edit":"Submit"}
            </button>
        </form>
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