/*
*
* Main Tetris Game's component
*
* */

import React from 'react';
import Layout from '../../components/Layout';
import { reducer } from '../../components/projects/tetris/reducer';
import {
  getInitialState, languageStrings,
  stateReducer,
} from '../../components/projects/tetris/stateReducer';
import {
  INITIAL_SPEED,
  SCORE_MULTIPLIER,
} from '../../const/projects/tetris/config';
import { DIRECTION } from '../../lib/projects/tetris/definitions';

export default function Tetris() {

  const [state, dispatch] = React.useReducer(
    reducer,
    0,
    getInitialState,
  );

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

  function captureKeyDown(event: KeyboardEvent) {

    const keys: Record<string, DIRECTION> = {
      'ArrowUp': DIRECTION.UP,
      'ArrowDown': DIRECTION.DOWN,
      'ArrowLeft': DIRECTION.LEFT,
      'ArrowRight': DIRECTION.RIGHT,
      'W': DIRECTION.UP,
      'S': DIRECTION.DOWN,
      'A': DIRECTION.LEFT,
      'D': DIRECTION.RIGHT,
      // for Vim users :)
      'K': DIRECTION.UP,
      'J': DIRECTION.DOWN,
      'H': DIRECTION.LEFT,
      'L': DIRECTION.RIGHT,
    };

    const keyName = event.key[0].toUpperCase() + event.key.substr(1);

    if (keyName === 'Escape')
      dispatch({
        type: 'TogglePauseGame',
      });

    if (
      keyName in keys &&
      state.type === 'MainState'
    )
      dispatch({
        type: 'MoveAction',
        direction: keys[keyName],
      });
  }

  React.useEffect(()=>{
    if(state.type !== 'MainState')
      return;

    document.addEventListener('keydown', captureKeyDown);
    return ()=>
      document.removeEventListener('keydown',captureKeyDown)
  },[state.type]);

  return <Layout
    title={languageStrings}
  >{
    (language) => <div
      className='bg-black w-screen h-screen flex justify-center items-center
          text-white'
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