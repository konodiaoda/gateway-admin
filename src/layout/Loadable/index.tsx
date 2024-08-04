import React, {LazyExoticComponent, Suspense} from "react";
import Loader from "@/layout/Loadable/Loader";

const Loadable = (Component: LazyExoticComponent<any>) => {
    return (
        <Suspense fallback={<Loader/>}>
            <Component/>
        </Suspense>
    );
};

export default Loadable;