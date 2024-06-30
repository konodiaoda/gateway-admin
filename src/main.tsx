import React, {StrictMode, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import 'overlayscrollbars/overlayscrollbars.css';
import App from './App'
import Loader from "@/layout/Loadable/Loader";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<Loader/>}>
            <App/>
        </Suspense>
    </StrictMode>
)
