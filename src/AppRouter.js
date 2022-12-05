import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, key) => 
                    <Route key={key} path={route.path} element={route.element} />
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter