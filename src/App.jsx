import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PoemPage from "./pages/PoemPage";
import AdminPage from "./pages/AdminPage";
import EditPoemPage from "./pages/EditPoemPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/poem/:slug" element={<PoemPage />} />
            </Route>
            <Route
                path="/admin/login"
                element={<AdminLoginPage />}
            />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/admin/new" element={<EditPoemPage />} />
            <Route path="/admin/edit/:id" element={<EditPoemPage />} />
        </Routes>
    );
}

export default App;