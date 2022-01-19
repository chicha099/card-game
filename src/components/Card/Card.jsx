import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { youUseCard } from "../../actions/actions";
import s from './Card.module.css';

export default function Card(props) {
    const dispatch = useDispatch();
    const yourMana = useSelector(state => state.player.your.MANA);

    function handleUseCard() {
        dispatch(youUseCard(props.id, props.player))
    }

    let id = `mana${yourMana}`

    return (
        <div className={s.main} onClick={() => handleUseCard()} id={s[id]}>
            <h4 className={s.noHover}>{props.name}</h4>
            <img src={props.img} alt="" width="40px" className={s.noHover} />
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