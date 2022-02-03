import { deck, deck2, newCards } from "../helpers/deckHelper";
import { cc } from "../helpers/buffAndDebuffHelper";

const yourDeck = [...deck, ...newCards].sort(() => Math.random() - 0.5);
const foesDeck = deck2.sort(() => Math.random() - 0.5);
const percentage = (per) => 100 / per;

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
        NONE: {
          TURNS: 0,
        },
      },
    },
    foes: {
      MAXHP: 100,
      HP: 100,
      ARMOR: 0,
      BUFF: {
        STRENGTH: {
          TURNS: 0,
        },
        DEXTERITY: {
          TURNS: 0,
        },
        THORNS: {
          TURNS: 0,
        },
        RITUAL: {
          TURNS: 0,
        },
        REGEN: {
          TURNS: 0,
        },
        METALLICIZE: {
          TURNS: 0,
        },
        INTANGIBLE: {
          TURNS: 0,
        },
        ARTIFACT: {
          TURNS: 0,
        },
      },
      DEBUFFS: {
        ANTIDEXTERITY: {
          TURNS: 0,
        },
        ANTISTRENGTH: {
          TURNS: 0,
        },
        FRAIL: {
          TURNS: 0,
        },
        POISON: {
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
        NONE: {
          TURNS: 0,
        },
      },
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
      console.log(usedCard);
      let players = {
        foes: "your",
        your: "foes",
      };
      let otherPlayer = players[action.payload.player];
      if (usedCard.attack) {
        let dmg =
          state.player[otherPlayer].ARMOR -
          (usedCard.attack +
            (usedCard.attack *
              Boolean(state.player[otherPlayer].DEBUFFS.VULNERABLE.TURNS)) /
              percentage(cc.VULNERABLE));
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
              DEBUFFS: {
                ...state.player[otherPlayer].DEBUFFS,
                [usedCard.debuff.type]: {
                  TURNS: usedCard.debuff.turns,
                },
              },
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
      } else {
        return {
          ...state,
          player: {
            ...state.player,
            [usedCard.objective]: {
              ...state.player[usedCard.objective],
              DEBUFFS: {
                ...state.player[usedCard.objective].DEBUFFS,
                [usedCard.debuff.type]: {
                  TURNS: usedCard.debuff.turns,
                },
              },
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
      let dmgToYou =
        state.player.your.ARMOR -
        action.payload.attack +
        state.player.foes.DEBUFFS.ANTISTRENGTH.TURNS +
        Boolean(state.player.foes.DEBUFFS.WEAK.TURNS) *
          Math.floor(action.payload.attack / 4);
      console.log("dmgtoyou", dmgToYou);
      console.log("actionpayload", action.payload.attack);
      return {
        ...state,
        player: {
          ...state.player,
          foes: {
            ...state.player.foes,
            ARMOR: action.payload.defense,
            DEBUFFS: {
              ...state.player.foes.DEBUFFS,
              VULNERABLE: {
                TURNS:
                  state.player.foes.DEBUFFS.VULNERABLE.TURNS > 0
                    ? state.player.foes.DEBUFFS.VULNERABLE.TURNS - 1
                    : state.player.foes.DEBUFFS.VULNERABLE.TURNS,
              },
              WEAK: {
                TURNS:
                  state.player.foes.DEBUFFS.WEAK.TURNS > 0
                    ? state.player.foes.DEBUFFS.WEAK.TURNS - 1
                    : state.player.foes.DEBUFFS.WEAK.TURNS,
              },
              ANTISTRENGTH: {
                TURNS:
                  state.player.foes.DEBUFFS.ANTISTRENGTH.TURNS > 0
                    ? state.player.foes.DEBUFFS.ANTISTRENGTH.TURNS - 1
                    : state.player.foes.DEBUFFS.ANTISTRENGTH.TURNS,
              },
            },
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
