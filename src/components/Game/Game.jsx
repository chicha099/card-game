import React from "react";
import s from './Game.module.css';
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nextCards } from "../../actions/actions";

export default function Game() {
    const yourDeck = useSelector(state => state.yourDeck);
    const foeDeck = useSelector(state => state.foesDeck);
    const yourCurrentCards = useSelector(state => state.yourCurrentCards);
    const foesCurrentCards = useSelector(state => state.foesCurrentCards);
    const dispatch = useDispatch();


    function handleTest() {
        dispatch(nextCards())
    }


    return (
        <div className={s.main}>
            <Nav />
            game
            <button onClick={() => handleTest()}>TEST</button>
            <div className={s.pjSkin}>
                <img src="https://art.ngfiles.com/images/707000/707908_gordonshier_samurai-idle-animation.gif?f1544124615" alt="" width='300px' />
            </div>
            <div className={s.foeSkin}>
                <img src="https://64.media.tumblr.com/1c85a367f7bfe0c879ad842ea50ca28a/tumblr_peociaWn8R1xwpni9o1_500.gifv" alt="" width='300px' />
            </div>
            <Cards yourCards={yourCurrentCards} foeCards={foesCurrentCards} />
        </div>
    )
}