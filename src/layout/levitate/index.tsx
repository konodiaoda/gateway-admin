import React, {startTransition, useEffect, useMemo, useState} from "react";
import {
    Autocomplete,
    Box,
    Drawer,
    Fab,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Slider,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import AnimateButton from "@/components/animateButton";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import {useTranslation} from "react-i18next";
import {countries, CountryType} from "@/layout/levitate/country";
import {IconCards, IconFileTypography, IconSettings, IconX} from '@tabler/icons-react';
import {
    changeBorderRadius,
    changeFontStyle,
    changeThemeLayout,
    changeThemeMode,
    useCustomSettingStore
} from "@/stores/customSettingStore";
import {crop, mountImage} from "@/utils/animationChangeThemeMode";

interface TabPanelProps {
    children: React.ReactNode,
    index: number;
    value: number;
}

const valuetext = (value: number) => {
    return `${value}px`;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`theme-tabpanel-${index}`}
            aria-labelledby={`theme-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{pl: 2, pr: 2}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `theme-tab-${index}`,
        'aria-controls': `theme-tabpanel-${index}`,
    };
}

const Levitate = () => {
    const theme = useTheme();
    const [themeMode, themeLayout, fontStyle] = useCustomSettingStore((state) =>
        [
            state.themeMode,
            state.themeLayout,
            state.fontStyle
        ])
    const [tabIndex, setTabIndex] = useState(0);
    // drawer on/off
    const [open, setOpen] = useState(false);
    const [borderRadius, setBorderRadius] = useState(8);
    const {i18n, t} = useTranslation();
    const defaultCountry = useMemo(() => {
        return countries.filter(k => k.languageCode === i18n.language)[0];
    }, [i18n.language]);

    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultCountry);

    const handleToggle = () => {
        setOpen(!open);
    };
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    const handleModeChange = (_event: React.MouseEvent<HTMLElement>, mode: "light" | "dark") => {
        if (mode != null) {
            const body = document.body;
            const rootElement = document.getElementById("root") as HTMLElement;
            mountImage(body).then(res => {
                rootElement.appendChild(res)
                crop(res, _event, {reverse: themeMode === "dark"}).then((canvas) => {
                    rootElement.removeChild(canvas)
                })
                changeThemeMode(mode)
            })
        }
    };

    const handleDirectionChange = (_event: React.MouseEvent<HTMLElement>, direction: "ltr" | "rtl") => {
        if (direction != null) {
            changeThemeLayout(direction);
        }
    };
    const handleCountryChange = (_event: React.SyntheticEvent, country: CountryType | null) => {
        if (country != null) {
            setSelectedCountry(country)
            i18n.changeLanguage(country.languageCode).then()
        }
    };

    useEffect(() => {
        startTransition(() => {
            changeBorderRadius(borderRadius)
        })
    }, [borderRadius])


    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton size="large" disableRipple>
                            <IconSettings color={theme.palette.grey[50]}/>
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>
            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <OverlayScrollbarsComponent
                    element="div"
                    defer
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 2,
                        }}
                    >
                        <Typography variant="h5">{t("settings.drawer.title")}</Typography>
                        <IconButton color="inherit" onClick={handleToggle} edge="end">
                            <IconX/>
                        </IconButton>
                    </Box>
                    <Box sx={{borderBottom: 1, borderTop: 1, borderColor: 'divider'}}>
                        <Tabs textColor="secondary" value={tabIndex}
                              sx={{backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[50]}}
                              onChange={handleTabChange} aria-label="select tabs for custom theme">
                            <Tab icon={<IconCards/>} sx={{width: "50%"}}
                                 aria-label="layout" {...a11yProps(0)}/>
                            <Tab icon={<IconFileTypography/>} sx={{width: "50%"}}
                                 aria-label="font" {...a11yProps(1)}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabIndex} index={0}>
                        {/*settings-language*/}
                        <Typography
                            gutterBottom
                            id="settings-language"
                            marginTop={3}
                            variant="h6"
                        >
                            {t("settings.drawer.language.label")}
                        </Typography>
                        <Autocomplete
                            id="language-select"
                            options={countries}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            autoHighlight
                            disableClearable
                            getOptionLabel={(option) => t(option.translation)}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {t(option.translation)} ({option.code})
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        {/*settings-mode*/}
                        <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">
                            {t("settings.drawer.mode.label")}
                        </Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={themeMode}
                            exclusive
                            fullWidth
                            onChange={handleModeChange}
                        >
                            <ToggleButton value="light">
                                {t("settings.drawer.mode.options.light")}
                            </ToggleButton>
                            <ToggleButton value="dark">
                                {t("settings.drawer.mode.options.dark")}
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {/*settings-direction*/}
                        <Typography gutterBottom id="settings-direction" marginTop={3} variant="h6">
                            {t("settings.drawer.direction.label")}
                        </Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={themeLayout}
                            exclusive
                            fullWidth
                            onChange={handleDirectionChange}
                        >
                            <ToggleButton value="ltr">
                                {t("settings.drawer.direction.options.ltr")}
                            </ToggleButton>
                            <ToggleButton value="rtl">
                                {t("settings.drawer.direction.options.rtl")}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        {/*settings-settings fontStyle*/}
                        <Typography
                            gutterBottom
                            id="settings-fontStyle"
                            marginTop={3}
                            variant="h6"
                        >
                            {t("settings.drawer.fontStyle.label")}
                        </Typography>
                        <Box>
                            <List sx={{
                                "& .MuiListItemButton-root": {
                                    border: '1px solid',
                                    marginBlockEnd: "10px",
                                    borderColor: "primary",
                                }
                            }} aria-label="Font Style">
                                <ListItemButton
                                    selected={fontStyle === "Nunito, sans-serif"}
                                    onClick={() => changeFontStyle("Nunito, sans-serif")}>
                                    <ListItemText primary="Nunito"/>
                                </ListItemButton>
                                <ListItemButton
                                    selected={fontStyle === "Poppins, sans-serif"}
                                    onClick={() => changeFontStyle("Poppins, sans-serif")}>
                                    <ListItemText primary="Poppins"/>
                                </ListItemButton>
                                <ListItemButton
                                    selected={fontStyle === "Roboto, sans-serif"}
                                    onClick={() => changeFontStyle("Roboto, sans-serif")}>
                                    <ListItemText primary="Roboto"/>
                                </ListItemButton>
                            </List>
                        </Box>

                        {/*settings-border radius*/}
                        <Typography
                            gutterBottom
                            id="settings-borderRadius"
                            marginTop={1}
                            variant="h6"
                        >
                            {t("settings.drawer.borderRadius.label")}
                        </Typography>
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Slider
                                    size="small"
                                    value={borderRadius}
                                    onChange={(_, value) => startTransition(() => {
                                        setBorderRadius(value as number)
                                    })}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="off"
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={2}
                                    min={4}
                                    max={24}
                                    color="secondary"
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="secondary">
                                    {borderRadius}px
                                </Typography>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                </OverlayScrollbarsComponent>
            </Drawer>
        </>
    );
};
export default Levitate;