import React from "react";
function TogglePassword({handleClick,text}){
    return (
        <button onClick={() => handleClick("toggle")}>
            {text}
        </button>
    );
}

export default TogglePassword;