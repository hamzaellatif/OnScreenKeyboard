/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './style.module.css'
import cn from 'classnames';
import TogglePassword from '../togglePassword';

const Input = ({type,id,value,focus,click,encryption=true}) => {
    const [blinkingCursorVisibility, setBlinkingCursorVisibility] = useState(true);
    
    const firstPart = encryption && type==="password" ? '*'.repeat(value?.first?.length) : value.first;
    const secondPart = encryption && type==="password" ? '*'.repeat(value?.second?.length) : value.second;
    
    useEffect(() => {
        const interval = setInterval(() => {
            setBlinkingCursorVisibility((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.txt} data-type={type} data-encryption={encryption}>
            <p onClick={()=> click(id) } className={cn({[styles.isActive]: focus === id})}>
                <span className={styles.part1} id="resultPart1">{firstPart}</span>
                <span className={styles.cursor} id="cursor">{blinkingCursorVisibility ? "|" : "  " }</span>
                <span className={styles.part2} id="resultPart2">{secondPart}</span>
            </p>
            
            {type === "password" && (<TogglePassword handleClick={click} text={encryption ? "Show" : "Hide"} />)}
        </div>
    );
}

export default Input;