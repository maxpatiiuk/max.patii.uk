/*
*
* Main Tetris Game's component
*
* */

import React from 'react';
import Layout from '../../components/Layout';
import { reducer } from '../../components/projects/tetris/reducer';
import {
  getInitialState,
  stateReducer,
} from '../../components/projects/tetris/stateReducer';
import {
  INITIAL_SPEED,
  SCORE_MULTIPLIER,
} from '../../const/projects/tetris/config';
import { LanguageStringsStructure } from '../../lib/languages';
import { DIRECTION } from '../../lib/projects/tetris/definitions';

export const languageStrings: LanguageStringsStructure<{
  title: string,
  paused: string,
  pressKeyToResume: (key: JSX.Element) => JSX.Element,
  instructions: string,
  score: string,
  gameOver: string,
  yourScore: string,
  yourBestScore: string,
  playAgain: string,
  nextShape: string,
}> = {
  'en-US': {
    title: 'Tetris ',
    paused: 'Game is paused',
    pressKeyToResume: (key) => <>Press {key} to resume</>,
    instructions: 'Control the game using WSAD or arrow keys. Pause using ' +
      'the ESC key',
    score: 'Score: ',
    gameOver: 'Game Over!',
    yourScore: 'Your score was: ',
    yourBestScore: 'Your best score is: ',
    playAgain: 'Play again?',
    nextShape: 'Next Shape: '
  },
};

export default function Tetris() {

  const [state, dispatch] = React.useReducer(
    reducer,
    0,
    getInitialState,
  );

  function captureKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {

    const keys: Record<string, DIRECTION> = {
      'ArrowUp': DIRECTION.UP,
      'ArrowDown': DIRECTION.DOWN,
      'ArrowLeft': DIRECTION.LEFT,
      'ArrowRight': DIRECTION.RIGHT,
      'W': DIRECTION.UP,
      'S': DIRECTION.DOWN,
      'A': DIRECTION.LEFT,
      'D': DIRECTION.RIGHT,
    };

    const keyName = event.key[0].toUpperCase() + event.key.substr(1);

    if (keyName === 'Escape')
      dispatch({
        type: 'TogglePauseGame',
      });

    if (event.key in keys && state.type === 'MainState' && !state.paused)
      dispatch({
        type: 'MoveAction',
        direction: keys[event.key],
      });
  }

  React.useEffect(()=>{

    if(state.type !== 'MainState')
      return;

    const callback = ()=>{
      dispatch({
        type: 'GravityAction',
        // Need to give a seed here, since the reducer is pure
        seed: Math.floor(Math.random() * 100),
      });
    };
    callback();
    const interval = setInterval(
      callback,
      // speed grows logarithmically
      INITIAL_SPEED/Math.log(3+state.score/SCORE_MULTIPLIER)
    );
    return ()=>
      clearInterval(interval);

  },[state.type, state.score]);

  return <Layout
    title={languageStrings}
  >{
    (language) => <div
      className='bg-black w-screen h-screen flex justify-center items-center
          text-white'
      tabIndex={0}
      onKeyDown={state.type === 'MainState' ?
        captureKeyDown :
        undefined
      }
    >{
      stateReducer(
        <></>,
        {
          ...state,
          parameters: {
            dispatch,
            language,
          },
        },
      )
    }</div>
  }</Layout>;

}