import React, {useState} from "react";
import PopupState, {bindPopper, bindToggle} from 'material-ui-popup-state';
import {Box, Card, Grid, IconButton, InputAdornment, Popper, useTheme} from "@mui/material";
import {IconAdjustmentsHorizontal, IconSearch} from "@tabler/icons-react";
import {styled} from "@mui/material/styles";
import {shouldForwardProp} from '@mui/system';
import CustomTransitions from "@/layout/MainLayout/customTransitions";
import {HeaderAvatarStyle, MobileSearch, OutlineInputStyle} from "@/layout/MainLayout/MobileSearch";

const PopperStyle = styled(Popper, {shouldForwardProp})(({theme}) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));


export const SearchSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    return (
        <>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <PopupState variant="popper" popupId="popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ml: 2}}>
                                <IconButton disableRipple sx={{borderRadius: '12px'}} {...bindToggle(popupState)}>
                                    <HeaderAvatarStyle variant="rounded">
                                        <IconSearch stroke={1.5} size="1.2rem"/>
                                    </HeaderAvatarStyle>
                                </IconButton>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({TransitionProps}) => (
                                    <>
                                        <CustomTransitions type="zoom" {...TransitionProps}
                                                           sx={{transformOrigin: 'left'}}>
                                            <Card
                                                sx={{
                                                    background: theme.palette.background.paper,
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{p: 2}}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue}
                                                                          popupState={popupState}/>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </CustomTransitions>
                                    </>
                                )}

                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    InputProps={{
                        startAdornment:
                            <>
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]}/>
                                </InputAdornment>
                            </>,
                        endAdornment:
                            <>
                                <InputAdornment position="end">
                                    <IconButton disableRipple sx={{borderRadius: '12px'}}>
                                        <HeaderAvatarStyle variant="rounded">
                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem"/>
                                        </HeaderAvatarStyle>
                                    </IconButton>
                                </InputAdornment>
                            </>
                    }}
                    aria-label="weight"
                    aria-describedby="search-helper-text"
                />
            </Box>
        </>
    )
}