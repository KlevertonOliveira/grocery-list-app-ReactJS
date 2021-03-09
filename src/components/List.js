import React from 'react'
import {GoTrashcan} from 'react-icons/go';
import {RiEdit2Fill} from 'react-icons/ri';

const List = ({list, deleteItem, editItem}) => {

  return (
    <section className="items-section">
      <table className="list-content">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>KG</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item)=>{
              const {id, name, amount, kg} = item;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{amount === 0? '-': amount}</td>
                  <td>{kg === 0? '-':kg}</td>
                  <td>
                  <div className="item-btn">
                      <button 
                        type="button" 
                        className="edit"
                        title="Edit item"
                        onClick={()=>editItem(id)}
                        >
                        <RiEdit2Fill />
                      </button>
                
                      <button 
                        type="button" 
                        className="remove"
                        title="Remove item"
                        onClick={()=>deleteItem(id)}
                        >
                        <GoTrashcan />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
          
        </tbody>
      </table>
    </section>
  );
}

export default List
