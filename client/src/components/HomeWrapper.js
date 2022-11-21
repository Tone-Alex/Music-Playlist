import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import Navigation from './Navigation'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import YouTubePlayerWrapper from './YouTubePlayerWrapper'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            <div id="home-wrapper">
                <Navigation />
                <div id='playlist-container'>
                    <HomeScreen />
                    <YouTubePlayerWrapper />
                </div>            
            </div>

        )
    else
        return <SplashScreen />
}