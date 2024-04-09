import React, {useRef} from "react";
import {Box, IconButton, useTheme} from "@mui/material";
import {HeaderAvatarStyle} from "@/layout/MainLayout/MobileSearch";
import {IconArrowsMaximize, IconArrowsMinimize} from "@tabler/icons-react";
import {useFullscreen, useToggle} from 'react-use';


const FullScreen = () => {
    const theme = useTheme();
    const currentDom = useRef(document.getElementById("root") as HTMLElement);
    const [show, toggle] = useToggle(false);
    const isFullscreen = useFullscreen(currentDom, show, {onClose: () => toggle(false)});

    return (
        <>
            <Box
                sx={{
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}>
                <IconButton disableRipple sx={{borderRadius: '12px'}} onClick={() => toggle()}>
                    <HeaderAvatarStyle
                        variant="rounded"
                        sx={{
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                            '&:hover': {
                                background: theme.palette.primary.dark,
                                color: theme.palette.primary.light
                            }
                        }}
                    >
                        {isFullscreen ?
                            <IconArrowsMaximize stroke={1.5} size="1.3rem"/>
                            :
                            <IconArrowsMinimize stroke={1.5} size="1.3rem"/>
                        }
                    </HeaderAvatarStyle>
                </IconButton>
            </Box>
        </>
    )

}

export default FullScreen;