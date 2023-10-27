import React, { useEffect, useState } from 'react';
import styles from './style.module.css'
import PropTypes from 'prop-types';
import {keyboardKeys} from '../../utils/data';
import cn from 'classnames';

function OnScreenKeyboard({methods,visiblity}) {
    const [currentKey, setCurrentKey] = useState('');
    const [getSentence, setSentence] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);
    const [firstPart, setFirstPart] = useState('');
    const [secondPart, setSecondPart] = useState('');
    const [visible, setVisible] = useState(visiblity);
    
    /******************* Navigation ******************* */
    const cursorLeft = () => {
        if (caretPosition > 0) {
            decPosition();
        }
    }

    const cursorRight = () => {
        if (caretPosition <= getSentence.length) {
            incPosition();
        }
    }
    /******************* Click ******************* */
    const onclick = (key,rowIndex,keyIndex) => {
        let current = "r"+rowIndex+"c"+keyIndex;
        setCurrentKey(current);
        switch(key.method){
            case "print":
                const character = key.value === "Space" ? key.text : key.value;
                setFirstPart((prevPart)=> prevPart + character);
                cursorRight();
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
        }
    }

    const setText = (text) => {
        setSentence(text);
    }

    const removeCharacter = () => {
        let newphrase = firstPart.substr(0, firstPart.length - 1);
        let newSentence = (newphrase + secondPart);
        setFirstPart(newphrase);
        setText(newSentence);
        cursorLeft();
    }

    const clearSentence = () => {
        setCaretPosition(0);
        setFirstPart("");
        setText("");
        setSecondPart("");
    }

    const incPosition = () => {
        setCaretPosition((prevCaretPosition) => ++prevCaretPosition);
    };

    const decPosition = () => {
        setCaretPosition(caretPosition - 1);
    };

    useEffect(()=>{
        if(firstPart !== ""){
            let newSentence = firstPart + secondPart;
            setText(newSentence);
        }
        methods.print({first: firstPart,second: secondPart});
    },[firstPart]);

    const sliceSentence = () => {
        setFirstPart(getSentence.slice(0, caretPosition));
        setSecondPart(getSentence.slice(caretPosition));
    }

    const toggleKeyboard = () => {
        setVisible(!visible);
        methods.toggleKeyboard();
    }

    /******************* Rendering ******************* */
    const renderColumn = (key,rowIndex,keyIndex,styles) => {
        let column='r'+rowIndex+'c'+keyIndex;
        
        return (<td
            key={`row_${rowIndex}_col_${keyIndex}`}
            colSpan={key.colspan}
            className={cn(styles.key,{[styles.isActive]: column === currentKey})}
            onClick={()=> onclick(key,rowIndex,keyIndex)}
        >
            {key.value}
        </td>);
    }
    return (
        <div className={styles.keyboard}>
            <button onClick={()=>{toggleKeyboard()}}>{visible ? "Show Virtual Keybaord" : "Hide Virtual Keybaord"}Keyboard</button>
            <div className={cn(styles.keysContainer,{[styles.isHidden]: visible})}>
                <table cellSpacing="8">
                    <tbody>
                        {keyboardKeys.map((row, rowIndex) => (
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