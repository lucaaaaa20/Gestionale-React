import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../Actions/login";
import { Prodotto } from "../Interfaces/Prodotto";

interface Props {
    setAggiorna: any,
}

export const FormInserimentoProdotti = (props: Props) => {
    let setAggiorna = props.setAggiorna;
    const dispatch = useDispatch();
    
    const inserimento = (evt: any) =>{
        evt.preventDefault();
        let codice = evt.target.inputCodice.value ? evt.target.inputCodice.value : Math.floor(Math.random() * 1000)
        let nome = evt.target.inputNome.value ? evt.target.inputNome.value : "Non Definito"
        let descrizione = evt.target.inputDescrizione.value ? evt.target.inputDescrizione.value : "Non Definito"
        let link = evt.target.inputImage.value ? evt.target.inputImage.value : "Non Definito"
        let prezzo = evt.target.inputPrezzo.value ? evt.target.inputPrezzo.value : 0
        let sconto = evt.target.inputSconto.value ? evt.target.inputSconto.value : 0
        let prodotto: Prodotto = {
            codice,
            nome,
            descrizione,
            image: link,
            prezzo,
            sconto,
        }
        console.log(prodotto)
        axios.post('http://localhost:4000/magazzino/prodotti', prodotto).then((risultato) => {
            if(risultato.data){
                dispatch(login())
                console.log(risultato.data)
            }
            setAggiorna(true)
        })
    }
    
    return (
        <>
            <form onSubmit={inserimento}>
                <Form.Group>
                    <Form.Label>Codice</Form.Label>
                    <Form.Control type="text" id="inputCodice" placeholder="inserisci il codice" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" id="inputNome" placeholder="inserisci il nome" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control type="text" id="inputDescrizione" placeholder="inserisci la descrizione" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Link Immagine</Form.Label>
                    <Form.Control type="text" id="inputImage" placeholder="inserisci il link dell'immagine" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control type="text" id="inputPrezzo" placeholder="inserisci il prezzo" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sconto</Form.Label>
                    <Form.Control type="text" id="inputSconto" placeholder="inserisci il sconto" />
                </Form.Group>
                <Button type="submit">Inserisci</Button>
            </form>
        </>
    )
}