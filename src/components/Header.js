import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="p-7 bg-orange-800">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-white hover:text-yellow-500">
                    로고
                </Link>
                <ul className="flex items-center justify-center gap-4">
                    <li>
                        <Link to="/home" className="text-white hover:text-yellow-500">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-white hover:text-yellow-500">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/todo" className="text-white hover:text-yellow-500">
                            Todo
                        </Link>
                    </li>
                </ul>
                <div className="flex justify-center gap-5">
                    <Link to="/signup" className="text-white hover:text-yellow-500">
                        Signup
                    </Link>
                    <Link to="/login" className="text-white hover:text-yellow-500">
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
