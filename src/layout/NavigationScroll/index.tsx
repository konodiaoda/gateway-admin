import { useLocation } from "react-router-dom";
import React, {useEffect} from "react";

type NavigationScrollSetting={
    children:  React.ReactNode;
}
const NavigationScroll = ({ children }:NavigationScrollSetting) => {
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};
export default NavigationScroll;