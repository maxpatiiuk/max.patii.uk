/*
 *
 * Main Tetris Game's component
 *
 *
 */

import React from 'react';

import Layout from '../../components/Layout';
import {
  getInitialState,
  languageStrings,
  stateReducer,
} from '../../components/projects/tetris/stateReducer';
import {
  INITIAL_SPEED,
  SCORE_MULTIPLIER,
} from '../../const/projects/tetris/config';
import { Direction } from '../../lib/projects/tetris/definitions';
import { reducer } from '../../lib/projects/tetris/reducer';

export default function Tetris() {
  const [state, dispatch] = React.useReducer(reducer, 0, getInitialState);

  React.useEffect(() => {
    if (state.type !== 'MainState') return;

    const callback = () => {
      dispatch({
        type: 'GravityAction',
        // Need to give a seed here, since the reducer is pure
        seed: Math.floor(Math.random() * 100),
      });
    };
    callback();
    const interval = setInterval(
      callback,
      // Speed grows logarithmically
      INITIAL_SPEED / Math.log(3 + state.score / SCORE_MULTIPLIER)
    );
    return () => clearInterval(interval);
  }, [state.type, state.score]);

  React.useEffect(() => {
    if (localStorage.getItem('highScore') !== null)
      dispatch({
        type: 'LoadHighScoreAction',
        highScore: localStorage.getItem('highScore')
          ? Number.parseInt(localStorage.getItem('highScore')!) || 0
          : 0,
      });
  }, []);

  function captureKeyDown(event: KeyboardEvent) {
    const keys: Record<string, Direction> = {
      ArrowUp: Direction.UP,
      ArrowDown: Direction.DOWN,
      ArrowLeft: Direction.LEFT,
      ArrowRight: Direction.RIGHT,
      W: Direction.UP,
      S: Direction.DOWN,
      A: Direction.LEFT,
      D: Direction.RIGHT,
      // For Vim users :)
      K: Direction.UP,
      J: Direction.DOWN,
      H: Direction.LEFT,
      L: Direction.RIGHT,
    };

    const keyName = event.key[0].toUpperCase() + event.key.slice(1);

    if (keyName === 'Escape' || keyName === 'P')
      dispatch({
        type: 'TogglePauseGameAction',
      });

    if (keyName in keys && state.type === 'MainState')
      dispatch({
        type: 'MoveAction',
        direction: keys[keyName],
      });
  }

  React.useEffect(() => {
    if (state.type !== 'MainState') return;

    document.addEventListener('keydown', captureKeyDown);
    return () => document.removeEventListener('keydown', captureKeyDown);
  }, [state.type]);

  return (
    <Layout title={languageStrings}>
      {(language) => (
        <div className="flex items-center justify-center w-screen h-screen text-white bg-black">
          {stateReducer(<></>, {
            ...state,
            parameters: {
              dispatch,
              language,
            },
          })}
        </div>
      )}
    </Layout>
  );
}
