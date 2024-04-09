import {Box, Chip, Drawer, Stack, useMediaQuery, useTheme} from "@mui/material";
import React from "react";
import LogoSection from "@/layout/MainLayout/LogoSection";
import {useDeviceDetect} from "@/hooks/useDeviceDetect";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import {drawerWidth, miniDrawerWidth} from "@/stores/constant";

const version = import.meta.env.VITE_VERSION as string

export interface SidebarProps {
    drawerOpen: boolean
    drawerToggle: () => void
}

export const Sidebar = ({drawerOpen, drawerToggle}: SidebarProps) => {
    const theme = useTheme();
    const {MobileView, BrowserView} = useDeviceDetect()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    const drawer = (
        <>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <Box sx={{display: 'flex', p: 2, mx: 'auto'}}>
                    <LogoSection/>
                </Box>
            </Box>
            <BrowserView>
                <OverlayScrollbarsComponent
                    element="div"
                    defer
                    style={{
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <Stack direction="row" justifyContent="center" sx={{mb: 2}}>
                        <Chip disabled label={"v" + version} size={"medium"}
                              sx={{
                                  cursor: 'pointer',
                                  backgroundColor: theme.palette.background.default
                              }}/>
                    </Stack>
                </OverlayScrollbarsComponent>
            </BrowserView>

            <MobileView>
                <Box sx={{px: 2}}>
                    <Stack direction="row" justifyContent="center" sx={{mb: 2}}>
                        <Chip disabled label={"v" + version} size={"medium"}
                              sx={{cursor: 'pointer'}}/>
                    </Stack>
                </Box>
            </MobileView>
        </>
    )
    return (
        <Box component="nav" sx={{flexShrink: {md: 0}, width: matchUpMd ? drawerWidth : 'auto'}}
             aria-label="mailbox folders">
            <Drawer
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: matchUpMd ? drawerWidth : miniDrawerWidth,
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '98px'
                        }
                    }
                }}
                ModalProps={{keepMounted: true}}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

