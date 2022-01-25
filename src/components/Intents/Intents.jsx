import React from "react";
import s from "./Intents.module.css";

export default function Intents(props) {
  return (
    <div className={s.main}>
      <p>{props.card.name}</p>
    </div>
  );
}
