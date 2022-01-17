import React from "react";
import { Link } from "react-router-dom";
import s from './Menu.module.css';

export default function Menu() {

    return (
        <div className={s.main}>
            <h1 className={s.title}>CARD GAME</h1>
            <Link to='/game'>
                <div className={s.link}><h1>START</h1></div>
            </Link>
        </div>
    )
}