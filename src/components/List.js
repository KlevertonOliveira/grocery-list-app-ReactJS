import React from 'react'
import {GoTrashcan} from 'react-icons/go';
import {RiEdit2Fill} from 'react-icons/ri';

const List = ({list, deleteItem, editItem}) => {

  return (
    <section className="items-section">
      {
        list.map((item)=>{
          const{id, title} = item;
          return (
            <article key={id}>
              <p className="title">{title}</p>
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
            </article>
          )
        })
      }
    </section>
  );
}

export default List
