import { Link, useNavigate } from "react-router-dom";
// import firebase from "../firebase";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Header = () => {
    // auth context의 "logout" 실행으로 상태변경
    const { logout } = useLogout();

    // {user, dispatch}중에 user만 받아옴
    const { user } = useAuthContext();
    console.log("===========header-user", user);

    const navigator = useNavigate();

    //  fb 로그아웃
    const handleLogout = () => {
        logout();
        // dispatch({ type: "logout" });
        // firebase.auth().signOut();
        // console.log("로그아웃");
        // setFBEmail("");
        // setFBName("");
        // setFBUid("");
        navigator("/login");
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
                            to={user ? "/todo" : "/login"}
                            className="text-white hover:text-yellow-500"
                        >
                            Todo
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/schedule"
                            className="text-white hover:text-yellow-500"
                        >
                            Schedule
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/upload"
                            className="text-white hover:text-yellow-500"
                        >
                            upload
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/todochart"
                            className="text-white hover:text-yellow-500"
                        >
                            chart
                        </Link>
                    </li>
                </ul>
                <div className="flex justify-center gap-5">
                    {/* <button
                        onClick={handleLogout}
                        className="text-orange-500 hover:text-orange-300"
                    >
                        로그아웃
                    </button> */}

                    {/* 로그인 시 로그아웃 창 , 로그아웃 시 로그인 창 띄우기*/}
                    {user ? (
                        <div className="text-white mx-3">
                            {user.displayName} {user.email}
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
