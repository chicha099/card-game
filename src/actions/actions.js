export function nextCards() {
    return {
        type: 'NEXT_CARDS'
    }
}

export function youUseCard(id, player) {
    return {
        type: 'YOU_USE_CARD',
        payload: {
            id: id,
            player: player
        }
    }
}

export function nextTurn() {
    return {
        type: 'NEXT_TURN'
    }
}