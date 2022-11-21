
import YouTubePlayer from "./YouTubePlayer";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useState} from "react";

export default function YouTubePlayerWrapper() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="YouTube-player-wrapper">
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="YouTube Player Tabs">
                    <Tab label="Player" />
                    <Tab label="Comments" />
                </Tabs>
                <Box sx={{ padding: 1 }}>
                    {value === 0 && (
                    <Box>
                        <YouTubePlayer />
                    </Box>
                    )}
                    {value === 1 && (
                    <Box>
                        <Typography>COMMENTS SECTION</Typography>
                    </Box>
                    )}
                </Box>
            </Box>
        </Box>
    </div>
  );


    // return (
    //     <YouTubePlayer />       //div with id YouTube-player already in youtube player component with position absolute
    // );


}