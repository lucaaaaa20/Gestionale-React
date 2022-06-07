import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Prodotto } from "../Interfaces/Prodotto";
import { FormInserimentoProdotti } from "./FormInserimentoProdotti";
import { RigaLista } from "./RigaLista";

export const ListaProdotti = () => {
    const [prodotti, setProdotti] = useState<Prodotto[]>()
    const [aggiorna, setAggiorna] = useState<boolean>(false)
    
    useEffect(() => {
        axios.get("http://localhost:4000/magazzino/prodotti").then((risultato) => {
            if (risultato.data.status == "success")
                setProdotti(risultato.data.data)
                setAggiorna(false)
        })
    }, [aggiorna])

    return (
        <>
        <FormInserimentoProdotti setAggiorna={setAggiorna}/>
            <Table>
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Link IMG</th>
                        <th>Prezzo</th>
                        <th>Sconto</th>
                        <th>Pr. Sconto</th>
                    </tr>
                </thead>
                <tbody>
                    {prodotti?.map(
                        (elemento, indice) => <RigaLista prodotti={elemento} key={indice} setAggiorna={setAggiorna} />
                    )}
                </tbody>
            </Table>
        </>
    )
}