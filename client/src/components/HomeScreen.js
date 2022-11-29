import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import MUIErrorPopup from './MUIErrorPopup';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);
    useEffect(() => {
        store.loadAllPlaylists();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                // store.idNamePairs.map((pair) => (
                //     <ListCard
                //         key={pair._id}
                //         idNamePair={pair}
                //         selected={false}
                //     />
                // ))
                store.currentPlaylists.map((playlist) => (
                    <ListCard
                        key={playlist._id}
                        playlist={playlist}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                <MUIErrorPopup />
            </div>
        </div>)
}

export default HomeScreen;