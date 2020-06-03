import React, { useMemo, useState } from 'react';
import Header from './Header';
import api from './Api';
import { Table, TableRow, TableCell, Switch, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function ListaPage() {

    const [corretoras, setCorretoras] = useState([]);

    async function loadData() {

        const response = await api.get('/').then(response => {
            const corretoras = response.data;
            setCorretoras(corretoras);
        })
    }

    useMemo(loadData, []);
    return (
        <>
            <Header />
            <Table style={{ marginTop: '80px' }}>

                {
                    corretoras.map(item => (
                        <TableRow>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nomecorretora}</TableCell>
                            <TableCell>{item.ativo}</TableCell>
                            <TableCell>{item.valorporoperacao}</TableCell>
                            <TableCell>
                                <Switch checked={item.comprado} color="primary" />
                                <Button variant="outlined" color="secondary" size="small">
                                    <DeleteIcon />Apagar
                                    </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>

            <Button></Button>
        </>
    )
}

export default ListaPage;