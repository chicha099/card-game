import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Menu.module.css";
import { resetGame } from "../../actions/actions";

export default function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGame());
  });
  return (
    <div className={s.main}>
      <h1 className={s.title}>CARD GAME</h1>
      <Link to="/game">
        <div className={s.link}>
          <h1>START</h1>
        </div>
      </Link>
    </div>
  );
}
