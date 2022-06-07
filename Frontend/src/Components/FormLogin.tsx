import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../Actions/login";
import { Prodotto } from "../Interfaces/Prodotto";
import { Utente } from "../Interfaces/Utente";

export const FormLogin = () => {

    const dispatch = useDispatch();
    
    const inserimento = (evt: any) =>{
        evt.preventDefault();
        let email = evt.target.inputEmail.value
        let password = evt.target.inputPassword.value
        let account: Utente = {
            email,
            password
        }
        axios.post('http://localhost:4000/magazzino/account', account).then((risultato) => {
            if(risultato.data){
                dispatch(login())
                console.log(risultato.data)
            }
        })
    }
    
    return (
        <>
        <h1>LOGIN</h1>
            <form onSubmit={inserimento}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" id="inputEmail" placeholder="inserisci l'Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" id="inputPassword" placeholder="inserisci la Password" />
                </Form.Group>
                <Button type="submit">Inserisci</Button>
            </form>
        </>
    )
}