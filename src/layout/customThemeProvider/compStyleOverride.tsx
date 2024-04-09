import {Theme} from "@mui/material";

export const componentStyleOverrides = (theme: Theme) => {
    const mode = theme.palette.mode;
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    color: "#FFF",
                    "&.Mui-disabled": {
                        color: theme.palette.grey[300],
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: `${theme.shape.borderRadius}px`,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: mode === "dark" ? theme.palette.primary : theme.palette.secondary,
                        backgroundColor: "rgba(63, 81, 181, 0.2)",
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.secondary,
                        color: theme.palette.primary.dark,
                        '& .MuiListItemIcon-root': {
                            color: theme.palette.secondary
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '36px'
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    padding: '15.5px 14px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    opacity: 1
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.secondary,
                    borderRadius: "12px !important",
                    border: "none",
                    textTransform: "none" as any,
                    "&.Mui-selected": {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.default,
                    padding: 5,
                },
            },
        },
    }
}
