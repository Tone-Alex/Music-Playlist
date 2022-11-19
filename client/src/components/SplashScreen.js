import { Icon, Button, Typography} from "@mui/material";
import MusicNote from '@mui/icons-material/MusicNote';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';

import logo from "../images/logo.png"
import Copyright from "./Copyright";

// const buttonStyle = {
//     backgroundColor: '#053970', 
//     fontSize: '16px', 
//     width: 250,
//     padding: '5px 30px',
//     fontWeight: 'bold'
// };

const buttonStyle = {
    border: '1px dotted #bb1919',
    backgroundColor: '#053970', 
    fontSize: '16px', 
    width: 250,
    padding: '5px 30px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#053970',
        color: '#f2f26e'
    }
}


export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div className="welcome-header">
                <MusicNote sx={{color: 'rgb(242, 242, 110)', fontSize: '5vw', marginRight: '50px'}}/>
                <Typography variant="h1">Welcome to</Typography>
                <img src={logo} id="header-logo" />
                <MusicNote sx={{color: 'rgb(242, 242, 110)', fontSize: '5vw'}}/>
            </div>

            <div className="welcome-intro">
                <p>The Playlister application invites all users to gather their interest in music, and to start enjoying all sorts of playlists!
                    With the ability to create and publish playlists, users can organize, upload, and play songs for themselves as well as others.
                     Guests are also welcomed to explore the numerous playlists available to listen for Free! 
                     So come and begin your music journey with Playlister. </p>
            </div>
            <h3 style={{fontSize: '36px', fontWeight: 'bold', fontFamily: 'Arial'}}>Get Started Now</h3>
            <div className="splash-screen-buttons">
                <Button href="/login/" variant='contained' sx={buttonStyle} startIcon={<Lock />}>
                    Login
                </Button>
                <Button href="/register/" variant='contained' sx={buttonStyle} startIcon={<PersonAdd />}>
                    Create Account
                </Button>
                <Button variant='contained' sx={buttonStyle} startIcon={<Person />}>
                    Continue as Guest
                </Button>
            </div>

            <Typography variant="body2" color="black" align="center" sx={{marginTop: '7%', fontWeight: 'bold'}}>
                {'Tone Alex © '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>

        </div>
    )
}