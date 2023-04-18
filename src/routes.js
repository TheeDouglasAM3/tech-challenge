import { Route, Routes, BrowserRouter } from "react-router-dom"
import TablePage from './pages/Table'
import UserPage from './pages/User'

export function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    )
}