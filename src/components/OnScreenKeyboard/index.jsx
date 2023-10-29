import React, { useEffect, useState } from 'react';
import styles from './style.module.css'
import {latin, upperCase, specialChars1} from '../../utils/layouts';
import cn from 'classnames';

function OnScreenKeyboard({ methods, input }) {
    const [currentKey, setCurrentKey] = useState('');
    const [layout, setLayout] = useState({name: 'latin', keys: latin});
    const [sentence, setSentence] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);
    const [firstPart, setFirstPart] = useState('');
    const [secondPart, setSecondPart] = useState('');
    const [visibility, setVisibility] = useState(false);
    
    const incPosition = () => {
        setCaretPosition((prevCaretPosition) => prevCaretPosition + 1);
    };

    const decPosition = () => {
        setCaretPosition((prevCaretPosition) => prevCaretPosition - 1);
    };

    const syncPosition = (content) => {
        if(content.length>0)
        setCaretPosition((content.length + 1));
    }
    /******************* Navigation ******************* */
    const cursorLeft = () => {
        if (caretPosition > 0) {
            decPosition();
        }
    }

    const cursorRight = () => {
        if (caretPosition <= sentence.length) {
            incPosition();
        }
    }
    /******************* keyboard clicks ******************* */
    // virtual keyboard
    const onclick = (key,rowIndex,keyIndex) => {
        let current = "r"+rowIndex+"c"+keyIndex;
        setCurrentKey(current);
        switch(key.method){
            case "print":
                addCharacter(key);
            break;
            case "cursorLeft":
                cursorLeft();
                sliceSentence();
            break;
            case "cursorRight":
                cursorRight();
                sliceSentence();
            break;
            case "eraseChar":
                removeCharacter();
            break;
            case "clearSentence":
                clearSentence();
            break;
            case "confirm":
                methods.confirm();
                clearSentence();
            break;
            case "changeLayout":
                switch(key.text){
                    case "latin":
                    case "default":
                        setLayout({name: key.text,keys: latin});
                    break;
                    case "uppercase":
                        setLayout({name: key.text,keys: upperCase});
                    break;
                    case "specialChars1":
                        setLayout({name: key.text,keys: specialChars1});
                    break;
                }
            break;
            default:
                console.log("Unmanaged vkey",key.method);
            break;
        }
    }
    
    const isAlphabets = (charCode) => { return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123);  }
    const isDigits = (charCode) => { return (charCode >= 48 && charCode <= 57) };
    const isBackSpace = (charCode) => { return (charCode === 8) };
    const isEnterOrTab = (charCode) => { return (charCode === 13 || charCode === 9) };
    const isNavigationKeys = (charCode) => { return (charCode === 37 || charCode === 39); }
    
    // physical keyboard
    useEffect(() => {
        const handleKeyDown = (evt) => {
            evt.preventDefault();
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (isAlphabets(charCode) || isDigits(charCode)) {
                addCharacter({value: evt.key,text: evt.key});
            } else if (isBackSpace(charCode)) {
                setFirstPart((prevSentence) => prevSentence.slice(0, -1));
                cursorLeft();
            } else if (isEnterOrTab(charCode)) {
                methods.confirm();
            }else if(isNavigationKeys(charCode)){
                charCode === 37 ? cursorLeft() : cursorRight();
                sliceSentence();
            }else {
                console.log('unmanaged key yet', charCode);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const addCharacter = (key) => {
        const character = key.value === "Space" ? key.text : key.value;
        setFirstPart((prevPart)=> prevPart + character);
        cursorRight();
    }

    const addPhrase = (content) => {
        setFirstPart((prevPart)=> prevPart + content);
        syncPosition(content);
    }

    const removeCharacter = () => {
        let newphrase = firstPart.substr(0, firstPart.length - 1);
        let newSentence = (newphrase + secondPart);
        setFirstPart(newphrase);
        setSentence(newSentence);
        cursorLeft();
    }

    const clearSentence = () => {
        setCaretPosition(0);
        setFirstPart("");
        setSentence("");
        setSecondPart("");
    }

    const sliceSentence = () => {
        setFirstPart(sentence.slice(0, caretPosition));
        setSecondPart(sentence.slice(caretPosition));
    }

    const toggleKeyboard = () => {
        setVisibility(!visibility);
    }

    /******************* useEffects ******************* */
    useEffect(()=>{
        if(firstPart !== ""){
            setSentence((firstPart + secondPart));
        }
        methods.print({first: firstPart,second: secondPart});
    },[firstPart]);

    useEffect(() => {
        clearSentence();
        if(input === "txtusername" || input === "txtpassword"){
            let content = methods.getInputText(input);
            addPhrase((content.first + content.second));
        }
    },[input])

    /******************* Rendering ******************* */
    const renderColumn = (key,rowIndex,keyIndex,styles) => {
        let column='r'+rowIndex+'c'+keyIndex;
        let isActiveLayout = key.className === "buttons" && layout.name === key.text;
        return (<td
            key={`row_${rowIndex}_col_${keyIndex}`}
            colSpan={key.colspan}
            className={cn(styles.key,{[styles.activeLayout]: isActiveLayout})}
            onClick={()=> onclick(key,rowIndex,keyIndex)}
        >
            {key.value}
        </td>);
    }

    return (
        <div className={styles.keyboard}>
            <button onClick={()=>{toggleKeyboard()}}>{visibility ? "Show Virtual Keybaord" : "Hide Virtual Keybaord"}Keyboard</button>
            <div className={cn(styles.keysContainer,{[styles.isHidden]: visibility})}>
                <table cellSpacing="8">
                    <tbody>
                        {layout.keys.map((row, rowIndex) => (
                            <tr key={`row_${rowIndex}`} className={styles.keysRow}>
                                {row.keys.map((key, keyIndex) => 
                                (
                                    renderColumn(key,rowIndex,keyIndex,styles)
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OnScreenKeyboard;