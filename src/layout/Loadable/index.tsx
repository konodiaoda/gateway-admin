import React, {Suspense} from "react";
import Loader from "@/layout/Loadable/Loader";

const Loadable = (Component: any) => {
    return (
        <Suspense fallback={<Loader/>}>
            <Component/>
        </Suspense>
    );
};

export default Loadable;