import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ThumbDown from '@mui/icons-material/ThumbDown';
import ThumbUp from '@mui/icons-material/ThumbUp';
import KeyboardDoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUp from '@mui/icons-material/KeyboardDoubleArrowUp';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import WorkspaceScreen from './WorkspaceScreen';
import { Collapse, Typography } from '@mui/material';

/*
    This is a card in our list of lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { playlist, selected, published } = props;
    const [listens, setListens] = useState(playlist.listens)
    const [likes, setLikes] = useState(playlist.likes);
    const [dislikes, setDislikes] = useState(playlist.dislikes);

    const [open, setOpen] = useState(store.currentList && store.currentList._id === playlist._id);

    function handleUserClick(event) {
        console.log("USER: " + playlist.username);
        event.stopPropagation(true);
        store.loadUserPlaylists(playlist.username);
    }

    function handleLike(event) {
        event.stopPropagation(true);
        if (playlist.published) {setLikes(likes + 1)}
        store.likePlaylist(playlist._id, playlist.username);
    }
    function handleDislike(event) {
        event.stopPropagation(true);
        if (playlist.published) {setDislikes(dislikes + 1)}
        store.dislikePlaylist(playlist._id, playlist.username);
    }

    function handleArrowClick(event) {
        event.stopPropagation();
        if (!open) {
            handleLoadList(event, playlist._id);
        } else {
            store.closeCurrentList();
        }

        setOpen(!open);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id, playlist.username);
        }
    }

    //checks for double click to start editing name of playlist
    function handleClick(event) {
        if (!store.currentList && event.detail === 2 && !playlist.published) {
            handleToggleEdit(event);
        } else {
            if (playlist.published) {
                setListens(listens + 1);
            }
            store.setCurrentPlayingPlaylist(playlist._id, playlist.username);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        setEditActive(newActive);
    }

    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);

            //set the name to the initial name if no changes were made or if input text is empty
            if (text === "") {
                store.changeListName(id, playlist.name);                
            } else {
                let verified = await store.verifyName(text);
                if (verified) {
                    store.changeListName(id, text);
                } else {
                    store.showNameErrorModal();
                }
            }

            setText("");
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    async function handleBlur(event) {
        if (text === "") {
            store.changeListName(playlist._id, playlist.name);
        } else {
            let verified = await store.verifyName(text);
            console.log("NAME VERIFIED IN BLUR: " + verified);
            if (verified) {
                store.changeListName(playlist._id, text);
            } else {
                store.showNameErrorModal();
            }
        }
        setText("");
        toggleEdit();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    if (published) {
        selectClass += " published-list-card"
    }
    if (store.currentPlayingPlaylist && store.currentPlayingPlaylist._id === playlist._id) {
        selectClass += " current-playing-playlist"
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            id={playlist._id}
            className={selectClass}
            key={playlist._id}
            // sx={{ marginTop: '15px', p: 1, backgroundColor: '#e1e4cb'}}
            sx={{ marginTop: '15px', p: 1}}
            style={{ width: '100%', fontFamily: 'Arial', fontSize: '16pt', fontWeight: 'bold', 
            borderRadius: '25px', display: 'flex', flexDirection: 'column'}}
            button
            onClick={handleClick}
            // disabled={store.listNameActive}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <div>
                    <Box sx={{ p: 1}}>{playlist.name}</Box>
                    <Box sx={{paddingLeft: 1, fontSize: '12pt'}}>
                        <Typography onClick={handleUserClick}>By: <span style={{color: 'blue', textDecoration: 'underline', fontWeight: 'bold'}}>
                            {playlist.username}</span></Typography>
                        </Box>
                </div>
                <div style={{display: 'flex', paddingRight: '15%'}}>
                    <Box sx={{ p: 1, visibility: playlist.published ? "visible" : "hidden"}}>
                        <IconButton className='likeIcon' aria-label='like' onClick={handleLike} disabled={!auth.loggedIn}>
                            <ThumbUp style={{fontSize:'20pt'}} />
                            {likes}
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1, visibility: playlist.published ? "visible" : "hidden"}}>
                        <IconButton className='dislikeIcon' onClick={handleDislike} aria-label='dislike' disabled={!auth.loggedIn}>
                            <ThumbDown style={{fontSize:'20pt'}} />
                            {dislikes}
                        </IconButton>
                    </Box>
                </div>
            </div>

            <Collapse in={open} timeout="auto" unmountOnExit
                sx={{width: '100%', p: 1 }}>
                <WorkspaceScreen />
            </Collapse>
            
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'end'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '73%', fontSize: '12pt'}}>
                    <Box sx={{ p: 1, color: 'green', visibility: playlist.published ? "visible" : "hidden"}}>
                        Published {new Date(playlist.publishedDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
                        </Box>
                    <Box sx={{color: '#b60404', visibility: playlist.published ? "visible" : "hidden"}}>Listens: {listens}</Box>
                </div>
                <div>
                    <Box sx={{ p: 1 }}>
                        <IconButton className='editIcon' onClick={handleArrowClick} aria-label='edit' disabled={store.currentList && store.currentList._id !== playlist._id}>
                            {open ? <KeyboardDoubleArrowUp style={{fontSize:'24pt'}}/> : <KeyboardDoubleArrowDown style={{fontSize:'24pt'}} />}
                        </IconButton>
                    </Box>
                </div>

            </div>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + playlist._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                onBlur={handleBlur}
                defaultValue={playlist.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;