import React, {useEffect} from "react";
import {Avatar, Box, IconButton, InputAdornment, TextField, useMediaQuery, useTheme} from "@mui/material";
import {bindToggle} from "material-ui-popup-state";
import {shouldForwardProp} from "@mui/system";
import {styled} from "@mui/material/styles";
import {IconAdjustmentsHorizontal, IconSearch, IconX} from '@tabler/icons-react';

export interface MobileSearchProps {
    value: string,
    setValue: (value: string) => void,
    popupState: any
}

export const OutlineInputStyle = styled(TextField, {shouldForwardProp})(({theme}) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

export const HeaderAvatarStyle = styled(Avatar, {shouldForwardProp})(({theme}) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));


export const MobileSearch = ({value, setValue, popupState}: MobileSearchProps) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    useEffect(() => {
        if (matches) {
            popupState.close()
        }
    }, [popupState, matches])

    return (
        <>
            <OutlineInputStyle
                id="input-search-header"
                aria-label="weight"
                aria-describedby="search-helper-text"
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
                                <Box sx={{ml: 1}}>
                                    <IconButton disableRipple sx={{borderRadius: '12px'}}>
                                        <HeaderAvatarStyle
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                background: theme.palette.orange.light,
                                                color: theme.palette.orange.dark,
                                                '&:hover': {
                                                    background: theme.palette.orange.dark,
                                                    color: theme.palette.orange.light
                                                }
                                            }}
                                            {...bindToggle(popupState)}
                                        >
                                            <IconX stroke={1.5} size="1.3rem"/>
                                        </HeaderAvatarStyle>
                                    </IconButton>
                                </Box>
                            </InputAdornment>
                        </>,
                }}
            >

            </OutlineInputStyle>
        </>
    )
}