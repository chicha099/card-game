import { deck, deck2 } from "../helpers/deckHelper"

const yourDeck = deck.sort(() => Math.random() - 0.5);
const foesDeck = deck2.sort(() => Math.random() - 0.5);

const initialState = {
    turn: "YOU",
    player: {
        your: {
            MAXHP: 100,
            HP: 100,
            ARMOR: 0,
            MANA: 3
        },
        foes: {
            MAXHP: 100,
            HP: 100,
            ARMOR: 0,
            MANA: 3
        }
    },
    yourDeck: yourDeck,
    foesDeck: foesDeck,
    yourCurrentCards: yourDeck.slice(0, 6),
    foesCurrentCards: foesDeck.slice(0, 6)
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'NEXT_CARDS':
            let yourCurrentCards = state.yourCurrentCards.sort(() => Math.random() - 0.5);
            let foesCurrentCards = state.foesCurrentCards.sort(() => Math.random() - 0.5);
            let yourDeckShifted = state.yourDeck.slice(6);
            let foesDeckShifted = state.foesDeck.slice(6);
            let newYourCurrentCards = yourDeckShifted.slice(0, 6);
            let newFoesCurrentCards = foesDeckShifted.slice(0, 6);
            return {
                ...state,
                yourDeck: [...yourDeckShifted, ...yourCurrentCards],
                foesDeck: [...foesDeckShifted, ...foesCurrentCards],
                yourCurrentCards: newYourCurrentCards,
                foesCurrentCards: newFoesCurrentCards
            };
        case 'YOU_USE_CARD':
            let usedCard = state[`${action.payload.player}CurrentCards`].find(c => c.id === action.payload.id);
            let players = {
                foes: 'your',
                your: 'foes'
            };
            let otherPlayer = players[action.payload.player]
            console.log(action.payload.player)
            if (usedCard.attack) {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        [otherPlayer]: {
                            ...state.player[otherPlayer],
                            HP: state.player[otherPlayer].HP + state.player[otherPlayer].ARMOR - usedCard.attack
                        }
                    }
                }
            }
            if (usedCard.defense) {
                return {
                    ...state,
                    player: {
                        ...state.player,
                        [action.payload.player]: {
                            ...state.player[action.payload.player],
                            ARMOR: state.player[action.payload.player].ARMOR + usedCard.defense
                        }
                    }
                }
            }

        default: return state
    }
}