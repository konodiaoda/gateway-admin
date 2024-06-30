import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CustomThemeProvider} from "@/layout/customThemeProvider";
import {I18nextProvider} from "react-i18next";
import i18n from "@/config/i18n";
import React from 'react'
import NavigationScroll from "@/layout/NavigationScroll";
import Routers from "@/routers";
import {RouterProvider} from "react-router-dom";

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
                staleTime: 5 * 60 * 1000,
                retry: 0
            },
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <NavigationScroll>
                    <CustomThemeProvider>
                        <RouterProvider router={Routers} />
                    </CustomThemeProvider>
                </NavigationScroll>
            </I18nextProvider>
        </QueryClientProvider>
    )
}
export default App
