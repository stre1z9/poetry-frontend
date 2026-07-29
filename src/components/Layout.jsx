import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header className="site-header">
                <div className="container">
                    <div className="header-content">
                        <Link
                            to="/"
                            className="logo"
                        >
                            Poetry.
                        </Link>
                        <nav className="navigation">
                            <Link
                                to="/poems"
                                className="nav-link-custom"
                            >
                                Стихотворения
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container py-5">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;