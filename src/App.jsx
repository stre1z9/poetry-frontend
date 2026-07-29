import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import AllPoems from "./pages/AllPoems.jsx";
import PoemPage from "./pages/PoemPage";
import TagPage from "./pages/TagPage";
import AdminPage from "./pages/AdminPage";
import EditPoemPage from "./pages/EditPoemPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminCommentsPage from "./pages/AdminCommentsPage.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/poems"
                    element={<AllPoems />}
                />
                <Route
                    path="/poem/:slug"
                    element={<PoemPage />}
                />
                <Route
                    path="/tag/:slug"
                    element={<TagPage />}
                />
            </Route>
            <Route
                path="/admin/login"
                element={<AdminLoginPage />}
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/comments"
                element={
                    <ProtectedRoute>
                        <AdminCommentsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/new"
                element={
                <ProtectedRoute>
                    <EditPoemPage />
                </ProtectedRoute>}
            />
            <Route
                path="/admin/edit/:id"
                element={
                <ProtectedRoute><EditPoemPage />
                </ProtectedRoute>}
            />
        </Routes>

    );

}

export default App;

