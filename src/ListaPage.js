import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './Api';


function ListaPage(){

    const [corretoras, setCorretoras ] = useState([]);

    async function loadData(){
        
            const response = await api.get('/').then(response =>{
            const corretoras = response.data;
            setCorretoras(corretoras);
        })
    }

    useEffect(loadData,[]);
    return <div>
    <Header/>
    
    <table>
        {
            corretoras.map(item => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nomecorretora}</td>
                    <td>{item.ativo}</td>
                    <td>{item.valorporoperacao}</td>
                </tr>
            ))
        }
    </table>
    </div>
}

export default ListaPage;