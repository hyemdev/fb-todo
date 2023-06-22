import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
    const styleObj = {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999999999,
    };
    return (
        <div style={styleObj}>
            <BeatLoader color="#ffdebf" />
        </div>
    );
};

export default Loading;
