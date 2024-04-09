import {AppBar, Box, CssBaseline, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import Levitate from "@/layout/levitate";
import {changeSidebarDrawer, useCustomSettingStore} from "@/stores/customSettingStore";
import Header from "@/layout/MainLayout/Header";
import {Outlet} from "react-router-dom";
import {Sidebar} from "@/layout/Sidebar";
import {drawerWidth} from "@/stores/constant";
import {styled} from "@mui/material/styles";

type MainProps = {
    open: boolean
}
// styles
const MainThemeComponent = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open', name: 'MainThemeComponent', slot: 'Root',
})<MainProps>
(({theme, open}) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }
            : {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

const MainLayout = () => {
    const theme = useTheme();
    const [sidebarDrawer] = useCustomSettingStore((state) =>
        [
            state.sidebarDrawer
        ])
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawOpen] = useState<boolean>(true)
    useEffect(() => {
        if (matchDownMd) {
            setDrawOpen(sidebarDrawer === 'full')
        } else {
            setDrawOpen(true)
        }
    }, [matchDownMd, sidebarDrawer])

    const handleLeftDrawerToggle = () => {
        changeSidebarDrawer(sidebarDrawer === 'full' ? 'mini' : 'full')
    };

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        transition: sidebarDrawer === "full" ? theme.transitions.create('width') : 'none'
                    }}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
                    </Toolbar>
                </AppBar>
                <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle}/>
                <MainThemeComponent theme={theme} open={drawerOpen}>
                    <Outlet/>
                </MainThemeComponent>
                <Levitate/>
            </Box>
        </>
    )
}

export default MainLayout;