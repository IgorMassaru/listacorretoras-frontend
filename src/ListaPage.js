import React, { useMemo, useState } from 'react';
import Header from './Header';
import api from './Api';
import { Table, TableRow, TableCell, Switch, Button,Dialog,DialogTitle, DialogContent, TextField,DialogActions,DialogContentText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


function ListaPage() {

    const [corretoras, setCorretoras] = useState([]);
    const[open,setOpen] = useState(false);
    const[nomecorretora,setNomeCorretora] = useState('');
    const[ativo,setAtivo] = useState('');
    const[valorporoperacao,setValorporoperacao]= useState('');
    
    async function loadData() {

        const response = await api.get('/').then(response => {
            const corretoras = response.data;
            setCorretoras(corretoras);
        })
    }

    useMemo(loadData, []);
    
    function openDialog(){
        setOpen(true);
    }

    function closeDialog(){
        setOpen(false);
    }

    async function salvar(){
        await api.post('/',{nomecorretora,ativo,valorporoperacao});
        loadData();
        setNomeCorretora('');
        setAtivo('');
        setValorporoperacao(1);
    }

    async function apagar(id){
        await api.delete(`/${id}`);
        loadData();
    }
     async function atualizar(id){
        await api.put(`/${id}`);
        loadData();
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
                        </TableRow>
                    ))
                }
            </Table>

            <Button 
                onClick={openDialog} 
                variant ="contained" 
                color="primary">Adicionar</Button>
            
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Nova Corretora</DialogTitle>
                <DialogContent>Cadastre sua nova corretora:
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
                        <Button onClick={salvar}>Salvar</Button>
                    </DialogActions>
            </Dialog>
        </>
    )
}

export default ListaPage;