/*
*
* Main Tetris Game's component
* Entrypoint for the view
*
* */

import React from 'react';
import LanguageContext from '../../components/LanguageContext';
import { reducer } from '../../components/projects/tetris/reducer';
import {
  getInitialState,
  stateReducer,
} from '../../components/projects/tetris/stateReducer';
import { SPEED } from '../../const/projects/tetris/config';
import { LanguageStringsStructure } from '../../lib/languages';
import { DIRECTION } from '../../lib/projects/tetris/definitions';

export const languageStrings: LanguageStringsStructure<{
  paused: string,
  press_key_to_resume: (key: JSX.Element) => JSX.Element,
  instructions: string,
  score: string,
  gameOver: string,
  yourScore: string,
  yourBestScore: string,
  playAgain: string,
}> = {
  'en-US': {
    paused: 'Game is paused',
    press_key_to_resume: (key) => <>Press {key} to resume</>,
    instructions: 'Control the game using WSAD or arrow keys. Pause using ' +
      'the ESC key. Rotate using the R key',
    score: 'Score: ',
    gameOver: 'Game Over!',
    yourScore: 'Your score was: ',
    yourBestScore: 'Your best score is: ',
    playAgain: 'Play again?',
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
      'R': DIRECTION.ROTATE,
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

  React.useEffect(() => {
    if (state.type !== 'MainState')
      return;

    let timeOut: any;

    function setTimeOut() {
      timeOut = setTimeout(
        () => {
          if (state.type !== 'MainState')
            return;
          if (!state.paused)
            dispatch({
              type: 'GravityAction',
              seed: Math.floor(Math.random() * 100),
            });
          setTimeOut();
        },
        SPEED,
      );
    }

    setTimeOut();

    return () =>
      clearTimeout(timeOut);


  }, [state.type]);

  return <LanguageContext.Consumer>{
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
  }</LanguageContext.Consumer>;

}