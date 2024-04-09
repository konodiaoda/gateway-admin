import React, {StrictMode, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import 'overlayscrollbars/overlayscrollbars.css';
import App from './App'
import Loader from "@/layout/Loadable/Loader";
import {BrowserRouter} from "react-router-dom";


const basenme = import.meta.env.BASE_URL
ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={basenme}>
            <Suspense fallback={<Loader/>}>
                <App/>
            </Suspense>
        </BrowserRouter>
    </StrictMode>
)
