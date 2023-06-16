import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Header = ({
    fbName,
    fbEmail,
    fbUid,
    setFBEmail,
    setFBName,
    setFBUid,
}) => {
    const navigator = useNavigate();
    //  fb 로그아웃
    const handleLogout = () => {
        firebase.auth().signOut();
        console.log("로그아웃");
        setFBEmail("");
        setFBName("");
        setFBUid("");
        navigator("/");
    };
    return (
        <header className="p-7 bg-orange-800">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-white hover:text-yellow-500">
                    로고
                </Link>
                <ul className="flex items-center justify-center gap-4">
                    <li>
                        <Link
                            to="/home"
                            className="text-white hover:text-yellow-500"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-white hover:text-yellow-500"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={fbUid ? "/todo" : "/login"}
                            className="text-white hover:text-yellow-500"
                        >
                            Todo
                        </Link>
                    </li>
                </ul>
                <div className="flex justify-center gap-5">
                    {/* 로그인 시 로그아웃 창 , 로그아웃 시 로그인 창 띄우기*/}
                    {fbUid ? (
                        <div className="text-white mx-3">
                            {fbName} {fbUid} {fbEmail}
                            <Link to="/mypage"> Mypage </Link>
                            <button onClick={handleLogout}> Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-yellow-500"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:text-yellow-500"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
