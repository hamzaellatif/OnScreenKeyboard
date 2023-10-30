import React from "react";
function TogglePassword({handleClick,text,tabIndex}){
    return (
        <button onClick={() => handleClick("toggle")} tabIndex={tabIndex}>
            {text}
        </button>
    );
}

export default TogglePassword;