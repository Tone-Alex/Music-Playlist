
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Groups from '@mui/icons-material/Groups';
import Person from '@mui/icons-material/Person';
import Sort from '@mui/icons-material/Sort';
import { TextField } from '@mui/material';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';


const buttonStyle = {
    margin: '0 5px',
    color: 'rgb(5, 57, 112)'
};

export default function Navigation() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const isSortMenuOpen = Boolean(anchorEl);

    const handleHomeClick = (event) => {
        store.setScreen("HOME");
    }

    const handleAllListsClick = (event) => {
        store.setScreen("ALL_LISTS");
    }

    const handleUserClick = (event) => {
        store.setScreen("USER");
    }

    const handleSortByName = (event) => {
        // store.sortPlaylistsByName();
        store.setSortMethod("NAME");
        handleMenuClose();
    }
    const handleSortByCreationDate = (event) => {
        // store.sortPlaylistsByCreationDate();
        store.setSortMethod("CREATION_DATE");
        handleMenuClose();
    }
    const handleSortByEditDate = (event) => {
        // store.sortPlaylistsByEditDate();
        store.setSortMethod("EDIT_DATE");
        handleMenuClose();
    }

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleUpdateSearch(event) {
        setSearchInput(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if (store.currentScreen === "HOME") {
                store.searchPlaylist(searchInput);
            }
            if (store.currentScreen === "ALL_LISTS") {
                store.loadPlaylistsByKeyword(searchInput);
            }
            if (store.currentScreen === "USER") {
                store.loadPlaylistsByUser(searchInput);
            }
            setSearchInput("");
        }
    }

    const sortID = "primary-search-sort-menu"
    let sortMenu = "";
    if (store.currentScreen === "HOME") {
        sortMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={sortID}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isSortMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortByName}>Name (A - Z)</MenuItem>
            <MenuItem onClick={handleSortByCreationDate}>By Creation Date (Old - New)</MenuItem>
            <MenuItem onClick={handleSortByEditDate}>By Last Edit Date (New - Old)</MenuItem>
        </Menu>

    } else {
        sortMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={sortID}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isSortMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>Name (A - Z)</MenuItem>
            <MenuItem>Publish Date (Newest))</MenuItem>
            <MenuItem>Listens (High - Low)</MenuItem>
            <MenuItem>Likes (High - Low)</MenuItem>
            <MenuItem>Dislikes (High - Low)</MenuItem>
        </Menu>
    }



    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar id="navigation">
            <Toolbar className="navigation-bar">
                <div className="screen-buttons">
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            style={{border: store.currentScreen === "HOME" ? "1px solid #053970" : "",
                                    visibility: auth.loggedIn ? "visible" : "hidden"}}
                            aria-label="Logged-in user Playlists"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleHomeClick}
                        >
                            <Home fontSize='large' />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            style={{border: store.currentScreen === "ALL_LISTS" ? "1px solid #053970" : ""}}
                            aria-label="All published playlists"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleAllListsClick}
                        >
                            <Groups fontSize='large'/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            style={{border: store.currentScreen === "USER" ? "1px solid #053970" : ""}}
                            aria-label="User specified playlists"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleUserClick}
                        >
                            <Person fontSize='large'/>
                        </IconButton>
                    </Box>
                </div>
                <div className="search-bar">
                    <TextField
                            margin="normal"
                            fullWidth
                            id="search-input"
                            label="Search"
                            name="searchKeyword"
                            onChange={handleUpdateSearch}
                            onKeyPress={handleKeyPress}
                            value={searchInput}
                        />
                </div>
                <div className="sort-playlist" style={{color: 'rgb(5,57,112)', fontWeight: 'bold'}}>
                    SORT BY
                    <IconButton
                            sx={buttonStyle}
                            edge="end"
                            aria-label="Sort Options"
                            aria-haspopup="true"
                            onClick={handleSortMenuOpen}
                            color="inherit"
                        >
                            <Sort fontSize='large' />
                        </IconButton>
                </div>               
            </Toolbar>
        </AppBar>
        {sortMenu}

        </Box>
    )
    
}