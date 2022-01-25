export function resetGame() {
  return {
    type: "RESET_GAME",
  };
}

export function youUseCard(id, player) {
  return {
    type: "YOU_USE_CARD",
    payload: {
      id: id,
      player: player,
    },
  };
}

export function nextTurn() {
  return {
    type: "NEXT_TURN",
  };
}

export function enemyTurn(card) {
  return {
    type: "ENEMY_TURN",
    payload: card,
  };
}
