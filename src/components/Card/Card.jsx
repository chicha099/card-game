import React from "react";
import s from './Card.module.css';

export default function Card(props) {

    return (
        <div className={s.main}>
            <h4 className={s.noHover}>{props.name}</h4>
            <img src={props.img} alt="" width="40px" className={s.noHover}/>
            {
                props.attack ? <h5 className={s.noHover}>Attack: {props.attack}</h5> : ""
            }
            {
                props.defense ? <h5 className={s.noHover}>Defense: {props.defense}</h5> : ""
            }
            <h4 className={s.noHover}>Cost: {props.mana}</h4>
        </div>
    )
}