import { Link } from "react-router-dom";

function Header() {

    return (
        <header className="border-bottom">
            <div className="container">
                <div
                    className="d-flex
                               justify-content-between
                               align-items-center
                               py-3">
                    <Link
                        to="/"
                        className="logo">
                        poetry.
                    </Link>
                    <nav>
                        <Link
                            to="/"
                            className="nav-link-custom">
                            Все стихотворения
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;