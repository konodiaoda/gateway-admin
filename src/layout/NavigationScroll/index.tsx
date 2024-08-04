import React, {useEffect} from "react";

type NavigationScrollSetting={
    children:  React.ReactNode;
}
const NavigationScroll = ({ children }:NavigationScrollSetting) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    return children || null;
};
export default NavigationScroll;