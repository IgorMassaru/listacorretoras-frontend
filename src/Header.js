import React from 'react';
import{AppBar,Typography, Toolbar} from '@material-ui/core'

function Header(){
    return(
        
        <AppBar>
        <Toolbar>   

        <Typography variant="h6">
        Lista Compras</Typography>
        </Toolbar> 
        </AppBar>
    )
        
    
}

export default Header;