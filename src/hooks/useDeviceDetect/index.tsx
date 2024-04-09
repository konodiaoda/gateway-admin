import {isBrowser} from "framer-motion";
import React from "react";
import UAParser, {IDevice} from 'ua-parser-js';
import {DeviceTypes} from "@/hooks/useDeviceDetect/constants";

export const ClientUAInstance = new UAParser();

export const browser = ClientUAInstance.getBrowser();
export const cpu = ClientUAInstance.getCPU();
export const device = ClientUAInstance.getDevice();
export const engine = ClientUAInstance.getEngine();
export const os = ClientUAInstance.getOS();
export const ua = ClientUAInstance.getUA();
export const setUa = (userAgentString: string) => ClientUAInstance.setUA(userAgentString);
export const isMobileAndTabletType = ({type}: IDevice) => type === DeviceTypes.Mobile || type === DeviceTypes.Tablet;
export const isMobileType = ({type}: IDevice) => type === DeviceTypes.Mobile;

export const isMobile = isMobileAndTabletType(device)

export const parseUserAgent = (userAgent: string) => {
    if (!userAgent) {
        console.error('No userAgent string was provided');
        return;
    }

    const UserAgentInstance = new UAParser(userAgent);

    return {
        UA: UserAgentInstance,
        browser: UserAgentInstance.getBrowser(),
        cpu: UserAgentInstance.getCPU(),
        device: UserAgentInstance.getDevice(),
        engine: UserAgentInstance.getEngine(),
        os: UserAgentInstance.getOS(),
        ua: UserAgentInstance.getUA(),
        setUserAgent: (userAgentString: string) => UserAgentInstance.setUA(userAgentString),
    };
};
type DetectProps = {
    children: React.ReactNode;
};
export const useDeviceDetect = () => {
    const BrowserView = ({children}: DetectProps) => {
        return isBrowser ? (
            <>{children}</>
        ) : null;
    };

    const MobileView = ({children}: DetectProps) => {
        return isMobile ? (
            <>{children}</>
        ) : null;
    };
    return {MobileView, BrowserView}
}