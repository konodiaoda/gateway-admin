import React from "react";
import {Box, IconButton, useMediaQuery, useTheme} from "@mui/material";
import LogoSection from "@/layout/MainLayout/LogoSection";
import {IconMenu2} from "@tabler/icons-react";
import {SearchSection} from "@/layout/MainLayout/SearchSection";
import {NotificationSection} from "@/layout/MainLayout/NotificationSection";
import {HeaderAvatarStyle} from "@/layout/MainLayout/MobileSearch";
import FullScreen from "@/layout/MainLayout/FullScreen";

export interface HeaderProps {
    handleLeftDrawerToggle: () => void
}

const Header = ({handleLeftDrawerToggle}: HeaderProps) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{display: {xs: 'none', md: 'block'}, flexGrow: 1}}>
                    <LogoSection/>
                </Box>
                <IconButton disableRipple sx={{borderRadius: '12px', overflow: 'hidden'}}
                            onClick={handleLeftDrawerToggle}>
                    <HeaderAvatarStyle
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: (theme) => theme.palette.secondary.light,
                            color: (theme) => theme.palette.secondary.dark,
                            '&:hover': {
                                background: (theme) => theme.palette.secondary.dark,
                                color: (theme) => theme.palette.secondary.light
                            }
                        }}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem"/>
                    </HeaderAvatarStyle>
                </IconButton>
            </Box>
            <SearchSection/>
            <Box sx={{flexGrow: 1}}/>
            <NotificationSection/>
            {matchUpMd ? <FullScreen/> : null}
        </>
    )
}

export default Header;