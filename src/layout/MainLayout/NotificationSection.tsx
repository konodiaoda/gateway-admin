import React, {useRef, useState} from "react";
import {Box, ClickAwayListener, Grid, IconButton, Paper, Popper, useMediaQuery, useTheme} from "@mui/material";
import {HeaderAvatarStyle} from "@/layout/MainLayout/MobileSearch";
import {IconBell} from "@tabler/icons-react";
import CustomTransitions from "@/layout/MainLayout/customTransitions";
import MainCard from "@/components/cards/MainCard";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

export const NotificationSection = () => {
    const theme = useTheme();
    const anchorRef = useRef<HTMLDivElement>(null);
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    return (
        <>
            <Box
                sx={{
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}>
                <IconButton disableRipple sx={{borderRadius: '12px'}} onClick={handleToggle}>
                    <HeaderAvatarStyle
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem"/>
                    </HeaderAvatarStyle>
                </IconButton>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <CustomTransitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} mainCardContent shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <OverlayScrollbarsComponent
                                            element="div"
                                            defer
                                            style={{
                                                height: '40%',
                                                overflowX: 'hidden'
                                            }}
                                        >
                                        </OverlayScrollbarsComponent>
                                    </Grid>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>

                    </CustomTransitions>
                )}

            </Popper>
        </>
    )
}