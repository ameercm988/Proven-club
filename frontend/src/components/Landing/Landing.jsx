import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Landing.css'

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [bookID, setbookID] = useState([]);
  const [buttonclick, setbuttonclick] = useState(false);

  const bookselection = (id) => {
    console.log('id', id)
  }
  console.log('data', data);
  console.log('bookID', bookID);

  useEffect(() => {
    // Make a GET request to fetch data from your Express backend
    axios.get('http://localhost:4444/library/getAllBooks')
      .then(response => {
        console.log('response', response);
        setData(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const checkoutBook= () => {
    // Make a GET request to fetch data from your Express backend
    const data = {
      bookID : bookID, 
    }
    axios.post('http://localhost:4444/library/checkout')
      .then(response => {
        console.log('response', response);
        setData(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className='main'>
      <h2>Library Panel</h2>
      <div className='sub_main'>
      {data.map((e,i) => {
        return (
          <select value={bookID} onChange={ e => setbookID(e.e.target.value)}>
            <option value={e.BookID} >{e.BookName}</option>
          </select>
      )
      })}
      </div>
      <div className='btndiv'>
      <butto className="checkoutbtn" onClick={()=> setbuttonclick(true)}>Checkout</butto>
      <button className="returnbtn">Return</button>
      </div>
      
    </div>
  );
};

export default LandingPage;
