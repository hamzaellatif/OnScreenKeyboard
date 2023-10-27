
export function initKey(idx, displayedChar, printedInput, actionMethod, colspan, className){
    if (typeof printedInput === "undefined") {
        printedInput = displayedChar;
    }

    if (typeof actionMethod === "undefined") {
        actionMethod = "print";
    }

    if (typeof colspan === "undefined") {
        colspan = 1;
    }

    if (typeof className === "undefined") {
        className = "";
    }

    return {
        idx: idx,
        value: displayedChar,
        text: printedInput,
        method: actionMethod,
        colspan: colspan,
        className: className
    };
}