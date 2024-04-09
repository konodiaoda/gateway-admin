import {Theme} from "@mui/material";

export const maxPasswordLength = 16
export const minPasswordLength = 8
const hasNumber = (value: string) => new RegExp(/[0-9]/).test(value);

// has mix of small and capitals
const hasMixed = (value: string) => new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);

// has special chars
const hasSpecial = (value: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(value);

export const strengthColor = (count: number, theme: Theme) => {
    if (count < 2) return {label: 'Poor', color: theme.palette.error.main};
    if (count < 3) return {label: 'Weak', color: theme.palette.warning.dark};
    if (count < 4) return {label: 'Normal', color: theme.palette.orange.main};
    if (count < 5) return {label: 'Good', color: theme.palette.success.main};
    if (count < 6) return {label: 'Strong', color: theme.palette.success.dark};
    return {label: 'Poor', color: theme.palette.error.main};
};
// password strength indicator
export const strengthIndicator = (value: string) => {
    let strengths = 0;
    if (value.length > maxPasswordLength) return 0
    if (value.length >= minPasswordLength) {
        strengths += 1;
        if (value.length > 9) strengths += 1;
        if (hasNumber(value)) strengths += 1;
        if (hasSpecial(value)) strengths += 1;
        if (hasMixed(value)) strengths += 1;
    }
    return strengths;
};