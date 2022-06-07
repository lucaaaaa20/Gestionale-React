import axios from "axios";
import { stringify } from "querystring";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Prodotto } from "../Interfaces/Prodotto";

interface Props {
    prodotti: Prodotto,
    setAggiorna: any
}

export const RigaLista = (props: Props) => {

    let setAggiorna = props.setAggiorna
    const [prodotto, setProdotto] = useState<Prodotto>()
    const [modifica, setModifica] = useState<Boolean>(false)
    const [idModificato, setIdModificato] = useState<number>()
    const [classe, setClasse] = useState<boolean>(false)

    const elimina = (id?: number) => {
        axios.delete(`http://localhost:4000/magazzino/prodotti/${id}`).then((risultato) => {
            if (risultato.data.status)
                setAggiorna(true)
        })
    }

    const apri_modifica = (id?: number) => {
        setClasse(true)
        setIdModificato(id)
        setModifica(true)
        axios.get(`http://localhost:4000/magazzino/prodotti/${id}`).then((risultato) => {

            if (risultato.data.status)
                setProdotto(risultato.data.data)
        })
    }

    const funz_modifica = (evt: any) => {
        evt.preventDefault()
        let codice = evt.target.inputCodice.value
        let nome = evt.target.inputNome.value
        let descrizione = evt.target.inputDescrizione.value
        let image = evt.target.inputImage.value
        let prezzo = evt.target.inputPrezzo.value
        let sconto = evt.target.inputSconto.value
        let prodotto: Prodotto = {
            codice,
            nome,
            descrizione,
            image,
            prezzo,
            sconto
        }
        console.log(prodotto)
        let id = idModificato
        axios.put(`http://localhost:4000/magazzino/prodotti/${id}`, prodotto).then((risultato) => {
            console.log(risultato)
            if (risultato.data.status == "success") {
                setModifica(false)
                setAggiorna(true)
            }
        })
    }

    let prezzo_scontato = (props.prodotti.prezzo ? props.prodotti.prezzo : 0) * (props.prodotti.sconto ? props.prodotti.sconto : 0) / 100;
    return (
        <>
            {modifica ? (
                <tr>
                    <td colSpan={12}>
                        <form onSubmit={funz_modifica}>
                            <div className={classe ? 'modifica' : ""}>
                                <Row>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Codice</Form.Label>
                                            <Form.Control type="text" id="inputCodice" placeholder={prodotto?.codice ? prodotto?.codice?.toString() : "Non definito"} />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Nome</Form.Label>
                                            <Form.Control type="text" id="inputNome" placeholder={prodotto?.nome} />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Descrizione</Form.Label>
                                            <Form.Control type="text" id="inputDescrizione" placeholder={prodotto?.descrizione} />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Image</Form.Label>
                                            <Form.Control type="text" id="inputImage" placeholder={prodotto?.image} />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Prezzo</Form.Label>
                                            <Form.Control type="text" id="inputPrezzo" placeholder={prodotto?.prezzo?.toString()} />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-md-2">
                                        <Form.Group>
                                            <Form.Label className="mt-2">Sconto</Form.Label>
                                            <Form.Control type="text" id="inputSconto" placeholder={prodotto?.sconto?.toString()} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-grid">
                                    <Col className="col">
                                        <Form.Group>
                                            <Button className="w-100 mt-2 btn-warning" onClick={() => setModifica(false)}>Annulla</Button>
                                        </Form.Group>
                                    </Col>
                                    <Col className="col">
                                        <Form.Group >
                                            <Button className="w-100 mt-2" type="submit">Salva</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </td>
                    <td>
                    </td>
                </tr>
            ) : !modifica && (
                <tr>
                    <td>{props.prodotti.codice}</td>
                    <td>{props.prodotti.nome}</td>
                    <td>{props.prodotti.descrizione}</td>
                    <td>{props.prodotti.image}</td>
                    <td>{props.prodotti.prezzo}€</td>
                    <td>{props.prodotti.sconto ? props.prodotti.sconto + "%" : "Sconto non presente"}</td>
                    <td>{prezzo_scontato ? prezzo_scontato : "Non disponibile"}</td>
                    <td>
                        <Button onClick={() => apri_modifica(props.prodotti.prodottoID)}>Modifica</Button>
                        <Button className="btn btn-danger ms-4" onClick={() => elimina(props.prodotti.prodottoID)}>Elimina</Button>
                    </td>
                </tr>
            )}
        </>
    )
}