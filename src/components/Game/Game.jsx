import React from "react";
import s from './Game.module.css';
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nextTurn, enemyTurn } from "../../actions/actions";
import Intents from "../Intents/Intents";


export default function Game({ history }) {
    // const yourDeck = useSelector(state => state.yourDeck);
    // const foeDeck = useSelector(state => state.foesDeck);
    const yourCurrentCards = useSelector(state => state.yourCurrentCards);
    const foesCurrentCards = useSelector(state => state.foesCurrentCards);
    const yourStats = useSelector(state => state.player.your);
    const foeStats = useSelector(state => state.player.foes);
    const dispatch = useDispatch();
    // console.log("FOE", foeStats.HP)
    // console.log("YOU", yourStats.HP)


    function handleTest() {
        dispatch(enemyTurn(foesCurrentCards))
        dispatch(nextTurn())
    }

    if (yourStats.HP <= 0 || foeStats.HP <= 0) {
        history.push('/')
    }

    return (
        <div className={s.main}>
            <Nav />
            game
            <button onClick={() => handleTest()}>End Turn</button>
            <div className={s.pjSkin}>
                {yourStats.MANA ? ("mana: " + yourStats.MANA) : "NO MANA"}
                <img src="https://art.ngfiles.com/images/707000/707908_gordonshier_samurai-idle-animation.gif?f1544124615" alt="" width='300px' />
                {yourStats.ARMOR ? yourStats.ARMOR : ""}<h6 className={s.HP} style={{ width: yourStats.HP * 3 }}>{yourStats.HP}/{yourStats.MAXHP}</h6>
            </div>
            <div className={s.foeSkin}>
                <Intents card={foesCurrentCards} />
                <img src="https://64.media.tumblr.com/1c85a367f7bfe0c879ad842ea50ca28a/tumblr_peociaWn8R1xwpni9o1_500.gifv" alt="" width='300px' />
                {foeStats.ARMOR ? foeStats.ARMOR : ""}<h6 className={s.HP} style={{ width: foeStats.HP * 3 }}>{foeStats.HP}/{foeStats.MAXHP}</h6>
            </div>
            <Cards yourCards={yourCurrentCards} foeCards={foesCurrentCards} />
        </div>
    )
}