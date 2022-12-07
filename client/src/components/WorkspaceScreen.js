import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import { GlobalStoreContext } from '../store/index.js'
import { IconButton } from '@mui/material'
import Fab from '@mui/material/Fab'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleAddNewSong(event) {
        event.stopPropagation(true);
        store.addNewSong();
    }
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let songCard = "";
    if (store.currentList) {
        songCard =
            <List 
                id="playlist-workspace"
                sx={{ width: '100%', bgcolor: 'transparent'}}
            >
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))  
                }
            </List> 
    }


    return (
        <Box>
         {songCard}
         <div className='add-song-container'>
            <Fab 
                sx={{visibility: store.currentList && !store.currentList.published ? "visible" : "hidden"}}
                color="primary" 
                aria-label="add song"
                id="add-song-button"
                onClick={handleAddNewSong}
            >
                <AddIcon />
            </Fab>
         </div>
         <EditToolbar />            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;