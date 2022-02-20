import React, { useState, useEffect } from 'react';
import './styles/Tips.css';

function Tips() {
  useEffect(() => {
    fetch('https://api.nomoreparties.co/todays-tips-rus').then((res) => {
      return res.json();
    }).then((res) => {
      setList(Object.values(res));  
    })
  }, []);
  const [list, setList] = useState();
  return (
    <div className="tips">
      <ul className="tips__list">
      {list &&  
        list.map((item, i) => {
          return (<li key={i} className="tips__item">{item.tip}</li>)
        })
      }
      </ul>
    </div>
  );
}

export default Tips;