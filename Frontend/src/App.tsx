import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { FormInserimentoProdotti } from './Components/FormInserimentoProdotti';
import { ListaProdotti } from './Components/ListaProdotti';
import { isLoggedReducer } from './Reducers/isLoggedReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FormLogin } from './Components/FormLogin';
import './App.css';

function App() {
  const isLoggedReducer = useSelector((state: {isLoggedReducer: boolean}) => state.isLoggedReducer)
  const dispatch = useDispatch()

  return (
    <div className="App">
      {isLoggedReducer ? (<ListaProdotti/>) : (<FormLogin/>)}
    </div>
  );
}

export default App;