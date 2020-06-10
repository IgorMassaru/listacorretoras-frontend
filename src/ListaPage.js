import React, { useMemo, useState } from 'react';
import Header from './Header';
import api from './Api';
import { Table, TableRow, TableCell, Switch, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function ListaPage() {

    const [ corretoras, setCorretoras] = useState([]);
    const [ open, setOpen] = useState(false);
    const [ nomecorretora, setNomeCorretora] = useState('');
    const [ ativo, setAtivo] = useState('');
    const [ valorporoperacao, setValorporoperacao] = useState('');
    const [ id, setId ] = useState(0);

    async function loadData() {

        const response = await api.get('/').then(response => {
            const corretoras = response.data;
            setCorretoras(corretoras);
        })
    }

    useMemo(loadData, []);

    function openDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    async function salvar() {
        if(id === 0) {
            await api.post('/', { nomecorretora, ativo, valorporoperacao });
        }
        else {
             await api.put(`/${id}`, { nomecorretora, ativo, valorporoperacao });
        }

        loadData();
        setId(0);
        setNomeCorretora('');
        setAtivo('');
        setValorporoperacao(1);
        closeDialog();
    }

    async function apagar(id) {
        await api.delete(`/${id}`);
        loadData();
    }
    async function editar(item) {
        setId(item.id);
        setNomeCorretora(item.nomecorretora);
        setAtivo(item.ativo);
        setValorporoperacao(item.valorporoperacao);
        openDialog();
    }


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
                                <Button variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => apagar(item.id)}>
                                    <DeleteIcon />Apagar
                                    </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => editar(item)}>
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>

            <Button
                onClick={openDialog}
                variant="contained"
                color="primary">Adicionar</Button>

            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>{id === 0 ? 'Nova' : 'Editar'} Corretora</DialogTitle>
                <DialogContent>{id === 0 ? 'Cadastre' : 'Edita'} sua corretora:
                <TextField
                        autoFocus
                        margin="dense"
                        id="namecorretora"
                        label="Nome Corretora"
                        type="email"
                        fullWidth
                        value={nomecorretora}
                        onChange={e => setNomeCorretora(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ativo"
                        label="Nome Ativo"
                        type="email"
                        fullWidth
                        value={ativo}
                        onChange={e => setAtivo(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="valorporoperacao"
                        label="Valor por Operacao"
                        type="email"
                        fullWidth
                        value={valorporoperacao}
                        onChange={e => setValorporoperacao(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancelar</Button>
                    <Button onClick={salvar}>{id === 0 ? 'Salvar' : 'Atualizar'}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ListaPage;