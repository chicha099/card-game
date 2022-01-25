import { deck, deck2 } from "../helpers/deckHelper";

const yourDeck = deck.sort(() => Math.random() - 0.5);
const foesDeck = deck2.sort(() => Math.random() - 0.5);

const initialState = {
  turn: "YOU",
  player: {
    your: {
      MAXHP: 100,
      HP: 100,
      ARMOR: 0,
      MANA: 3,
      BUFF: {
        STRENGTH: {
          AMOUNT: 0,
        },
        DEXTERITY: {
          AMOUNT: 0,
        },
        THORNS: {
          AMOUNT: 0,
        },
        RITUAL: {
          AMOUNT: 0,
        },
        REGEN: {
          AMOUNT: 0,
        },
        METALLICIZE: {
          AMOUNT: 0,
        },
        INTANGIBLE: {
          TURNS: 0,
        },
        ARTIFACT: {
          AMOUNT: 0,
        },
      },
      DEBUFFS: {
        ANTIDEXTERITY: {
          AMOUNT: 0,
        },
        ANTISTRENGTH: {
          AMOUNT: 0,
        },
        FRAIL: {
          TURNS: 0,
        },
        POISON: {
          AMOUNT: 0,
          TURNS: 0,
        },
        VULNERABLE: {
          TURNS: 0,
        },
        WEAK: {
          TURNS: 0,
        },
        ENTANGLED: {
          TURNS: 0,
        },
      },
    },
    foes: {
      MAXHP: 100,
      HP: 100,
      ARMOR: 0,
    },
  },
  yourDeck: yourDeck,
  yourUsedCards: [],
  foesDeck: foesDeck,
  yourCurrentCards: yourDeck.slice(0, 6),
  foesCurrentCards: foesDeck.shift(),
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "YOU_USE_CARD":
      let usedCard = state[`${action.payload.player}CurrentCards`].find(
        (c) => c.id === action.payload.id
      );
      let newCurrentCards = state.yourCurrentCards.filter(
        (c) => c.id !== action.payload.id
      );
      console.log(newCurrentCards);
      let players = {
        foes: "your",
        your: "foes",
      };
      let otherPlayer = players[action.payload.player];
      if (usedCard.attack) {
        let dmg = state.player[otherPlayer].ARMOR - usedCard.attack;
        return {
          ...state,
          yourCurrentCards: [...newCurrentCards],
          yourUsedCards: [...state.yourUsedCards, usedCard],
          player: {
            ...state.player,
            your: {
              ...state.player.your,
              MANA: state.player.your.MANA - usedCard.mana,
            },
            [otherPlayer]: {
              ...state.player[otherPlayer],
              HP: state.player[otherPlayer].HP + (dmg < 0 ? dmg : 0),
              ARMOR:
                state.player[otherPlayer].ARMOR - usedCard.attack < 0
                  ? 0
                  : state.player[otherPlayer].ARMOR - usedCard.attack,
            },
          },
        };
      }
      if (usedCard.defense) {
        return {
          ...state,
          yourCurrentCards: [...newCurrentCards],
          yourUsedCards: [...state.yourUsedCards, usedCard],
          player: {
            ...state.player,
            [action.payload.player]: {
              ...state.player[action.payload.player],
              MANA: state.player.your.MANA - usedCard.mana,
              ARMOR:
                state.player[action.payload.player].ARMOR + usedCard.defense,
            },
          },
        };
      }
    case "NEXT_TURN":
      let yourCurrentCards = state.yourCurrentCards.sort(
        () => Math.random() - 0.5
      );
      let foesCurrentCards = state.foesCurrentCards;
      let yourDeckShifted = state.yourDeck.slice(6);
      let newYourCurrentCards = yourDeckShifted.slice(0, 6);
      let newFoesCurrentCards = state.foesDeck.shift();
      return {
        ...state,
        yourUsedCards: [],
        yourDeck: [
          ...yourDeckShifted,
          ...yourCurrentCards.sort(() => Math.random() - 0.5),
          ...state.yourUsedCards.sort(() => Math.random() - 0.5),
        ],
        foesDeck: [...state.foesDeck, foesCurrentCards],
        yourCurrentCards: newYourCurrentCards,
        foesCurrentCards: newFoesCurrentCards,
        player: {
          ...state.player,
          your: {
            ...state.player.your,
            MANA: 3,
            ARMOR: 0,
          },
        },
      };
    case "ENEMY_TURN":
      let dmgToYou = state.player.your.ARMOR - action.payload.attack;
      console.log(action.payload);
      return {
        ...state,
        player: {
          ...state.player,
          foes: {
            ...state.player.foes,
            ARMOR: action.payload.defense,
          },
          your: {
            ...state.player.your,
            HP: state.player.your.HP + (dmgToYou < 0 ? dmgToYou : 0),
            ARMOR:
              state.player.your.ARMOR - action.payload.attack < 0
                ? 0
                : state.player.your.ARMOR - action.payload.attack,
          },
        },
      };
    case "RESET_GAME":
      return {
        turn: "YOU",
        player: {
          your: {
            MAXHP: 100,
            HP: 100,
            ARMOR: 0,
            MANA: 3,
            BUFF: {
              STRENGTH: {
                AMOUNT: 0,
              },
              DEXTERITY: {
                AMOUNT: 0,
              },
              THORNS: {
                AMOUNT: 0,
              },
              RITUAL: {
                AMOUNT: 0,
              },
              REGEN: {
                AMOUNT: 0,
              },
              METALLICIZE: {
                AMOUNT: 0,
              },
              INTANGIBLE: {
                TURNS: 0,
              },
              ARTIFACT: {
                AMOUNT: 0,
              },
            },
            DEBUFFS: {
              ANTIDEXTERITY: {
                AMOUNT: 0,
              },
              ANTISTRENGTH: {
                AMOUNT: 0,
              },
              FRAIL: {
                TURNS: 0,
              },
              POISON: {
                AMOUNT: 0,
                TURNS: 0,
              },
              VULNERABLE: {
                TURNS: 0,
              },
              WEAK: {
                TURNS: 0,
              },
              ENTANGLED: {
                TURNS: 0,
              },
            },
          },
          foes: {
            MAXHP: 100,
            HP: 100,
            ARMOR: 0,
          },
        },
        yourDeck: yourDeck,
        yourUsedCards: [],
        foesDeck: foesDeck,
        yourCurrentCards: yourDeck.slice(0, 6),
        foesCurrentCards: foesDeck.shift(),
      };

    default:
      return state;
  }
}
