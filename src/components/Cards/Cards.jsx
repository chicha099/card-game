import React from "react";
import Card from "../Card/Card";
import s from './Cards.module.css';
import Intents from "../Intents/Intents";

export default function Cards(props) {

    return (
        <div className={s.main}>
            <div className={s.you}>
                {props.yourCards && props.yourCards.map((c) => {
                    return <Card name={c.name} img={c.img} attack={c.attack} defense={c.defense} mana={c.mana} id={c.id} player={c.player} key={c.id} />
                })}
                <h3 className={s.yourCards}>Your Cards</h3>
            </div>
            <div className={s.foe}>
                {/* {props.foeCards && props.foeCards.map(c => {
                    return <Card name={c.name} img={c.img} attack={c.attack} defense={c.defense} mana={c.mana} id={c.id} player={c.player} />
                })}
                <h3 className={s.foeCards}>Foe's Cards</h3> */}

            </div>
        </div>

    )
}