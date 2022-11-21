import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    if (store.currentList && auth.loggedIn) {
        text = store.currentList.name;
        return (
            <div id="playlister-statusbar">
                <Typography variant="h4">{text}</Typography>
            </div>
        );
    } else {
        return (
            <div id='list-selector-heading'>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    // onClick={handleCreateNewList}
                    disabled={store.listNameActive}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
        )
    }
}

export default Statusbar;