/*
* State Reducer
* */


import React from 'react';
import {
  BOARD_X,
  BOARD_Y,
  SHAPES,
} from '../../../const/projects/tetris/config';
import { AvailableLanguages } from '../../../lib/languages';
import { generateReducer, State } from '../../../lib/stateManagement';
import { languageStrings } from '../../../pages/projects/tetris';
import { Cell } from './components';
import { Actions } from './reducer';

type GameOverState = State<'GameOverState'> & {
  score: number,
  bestScore: number,
}

export type MainState = State<'MainState'> & {
  board: (keyof typeof SHAPES)[][],
  score: number,
  bestScore: number,
  currentShape: keyof typeof SHAPES,
  currentShapeLocation: Record<number, Record<number, true>>,
  nextShape: keyof typeof SHAPES,
  paused: boolean,
}

export type States =
  MainState
  | GameOverState;

export function mainState(state: States): MainState {
  if (state.type !== 'MainState')
    throw new Error('Action called from wrong state');
  return state;
}

export const gameOverState = (state: MainState): GameOverState => (
  {
    type: 'GameOverState',
    score: state.score,
    bestScore: state.bestScore,
  }
);

export const getInitialState = (bestScore = 0): MainState => (
  {
    type: 'MainState',
    board: Array(BOARD_Y).fill(
      Array(BOARD_X).fill('_'),
    ),
    currentShapeLocation: {},
    currentShape: '_',
    nextShape: '_',
    score: 0,
    bestScore,
    paused: false,
  }
);

type StatesWithParameters = States & {
  parameters: {
    dispatch: (action: Actions) => void,
    language: AvailableLanguages['type'],
  }
};

export const stateReducer = generateReducer<JSX.Element, StatesWithParameters>({
  'MainState': ({action: {parameters, ...state}}) => {
    return <div
      className='grid grid-cols-4'
      style={{
        width: '100vmin',
        height: '100vmin',
      }}
    >
      <span />
      {
        state.paused &&
        <div className='absolute bg-black flex h-screen inset-0 items-center
          justify-center opacity-75 text-4xl text-center w-screen'>
          <span>
            {languageStrings[parameters.language].paused}
            <br />
            {languageStrings[parameters.language].press_key_to_resume(
              <span className='bg-white p-px rounded-xl text-black'>ESC</span>,
            )}
          </span>
        </div>
      }
      <div className='col-span-2 bg-gradient-to-tr from-yellow-400
          to-purple-400 p-2'>
        <div className='h-full grid grid-cols-10 gap-0.5'>{
          state.board.map((row, index) => <React.Fragment key={index}>{
            row.map((cell, index) => <Cell
              key={index}
              color={SHAPES[cell].color}
            />)
          }</React.Fragment>)
        }</div>
      </div>
      <div className='p-2'>
        {languageStrings[parameters.language].instructions}
        <br />
        <span className='text-4xl'>
          {languageStrings[parameters.language].score} {state.score}
        </span>
        <br />
        {
          state.nextShape !== '_' &&
          <span className={'text 4xl pt-2'}>
            {languageStrings[parameters.language].nextShape} {state.nextShape}
          </span>
        }
      </div>
    </div>;
  },
  'GameOverState': ({action: {parameters, ...state}}) => <div
    className='flex items-center justify-center text-3xl text-center'
  >
    <span>
      <h1 className='pb-4 text-6xl'>
        {languageStrings[parameters.language].gameOver}
      </h1>
      <h2>{languageStrings[parameters.language].yourScore} {state.score}</h2>
      <h2>
        {languageStrings[parameters.language].yourBestScore} {state.bestScore}
      </h2>
      <button
        className='bg-white hover:bg-gray-600 mt-6 p-5 text-black'
        onClick={() => parameters.dispatch({
          type: 'RestartGameAction',
        })}
      >
        {languageStrings[parameters.language].playAgain}
      </button>
    </span>
  </div>,
});