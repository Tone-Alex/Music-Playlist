
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
import { useState } from 'react';


const buttonStyle = {
    margin: '0 5px',
    color: 'rgb(5, 57, 112)'
};

export default function Navigation() {

    const [anchorEl, setAnchorEl] = useState(null);
    const isSortMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortID = "primary-search-sort-menu"
    const sortMenu = 
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



    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar id="navigation">
            <Toolbar className="navigation-bar">
                <div className="screen-buttons">
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            aria-label="Logged-in user Playlists"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Home fontSize='large' />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            aria-label="All published playlists"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Groups fontSize='large'/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            sx={buttonStyle}
                            aria-label="User specified playlists"
                            aria-haspopup="true"
                            color="inherit"
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