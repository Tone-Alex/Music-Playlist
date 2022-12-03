import { useContext, useEffect } from 'react'
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

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);
    useEffect(() => {
        store.loadAllPlaylists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    // if (store.currentList && auth.loggedIn) {
    //     text = store.currentList.name;
    //     return (
    //         <div id="playlister-statusbar">
    //             <Typography variant="h4">{text}</Typography>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div id='list-selector-heading'>
    //             <Fab 
    //                 color="primary" 
    //                 aria-label="add"
    //                 id="add-list-button"
    //                 onClick={handleCreateNewList}
    //                 disabled={store.listNameActive}
    //             >
    //                 <AddIcon />
    //             </Fab>
    //             <Typography variant="h2">Your Lists</Typography>
    //         </div>
    //     )
    // }
    if ((auth.loggedIn || auth.guest) && store.currentScreen === "HOME") {
        return (
            <div id='list-selector-heading'>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={store.listNameActive}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
        )
    } else if (store.currentScreen === "ALL_LISTS" || store.currentScreen === "USER") {
        return (
            <div id='list-selector-heading'>
                <Typography sx={{fontSize: '36pt'}}>
                    {store.searchResult} Playlists
                </Typography>
            </div>
        )
    }
}

export default Statusbar;