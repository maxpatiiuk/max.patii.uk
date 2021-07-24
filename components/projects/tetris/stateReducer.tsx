/*
 * State Reducer
 */

import React from 'react';
import type { State } from 'typesafe-reducer';
import { generateReducer } from 'typesafe-reducer';

import {
  BOARD_X,
  BOARD_Y,
  SHAPES,
} from '../../../const/projects/tetris/config';
import type {
  AvailableLanguages,
  LanguageStringsStructure,
} from '../../../lib/languages';
import type { Actions } from '../../../lib/projects/tetris/reducer';
import { Cell, fancyButtonStyles } from './components';

type GameOverState = State<
  'GameOverState',
  {
    score: number;
    bestScore: number;
  }
>;

export type ShapeLocation = Record<number, Record<number, boolean>>;

export type MainState = State<
  'MainState',
  {
    board: readonly (readonly (keyof typeof SHAPES)[])[];
    score: number;
    bestScore: number;
    currentShape: keyof typeof SHAPES;
    currentShapeLocation: ShapeLocation;
    nextShape: keyof typeof SHAPES;
    paused: boolean;
  }
>;

export type States = MainState | GameOverState;

export function mainState(state: States): MainState {
  if (state.type !== 'MainState')
    throw new Error('Action called from wrong state');
  return state;
}

export function gameOverState(state: MainState): GameOverState {
  const newState: GameOverState = {
    type: 'GameOverState',
    score: state.score,
    bestScore: state.score > state.bestScore ? state.score : state.bestScore,
  };

  localStorage.setItem('highScore', newState.bestScore.toString());

  return newState;
}

export const getInitialState = (bestScore = 0): MainState => ({
  type: 'MainState',
  board: Array.from<MainState['board'][number]>({ length: BOARD_Y }).fill(
    Array.from<MainState['board'][number][number]>({ length: BOARD_X }).fill(
      '_'
    )
  ),
  currentShapeLocation: {},
  currentShape: '_',
  nextShape: '_',
  score: 0,
  bestScore,
  paused: false,
});

type StatesWithParameters = States & {
  parameters: {
    dispatch: (action: Actions) => void;
    language: AvailableLanguages['type'];
  };
};

export const languageStrings: LanguageStringsStructure<{
  title: string;
  paused: string;
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  pressKeyToResume: (key: JSX.Element) => JSX.Element;
  instructions: string;
  score: string;
  gameOver: string;
  yourScore: string;
  yourBestScore: string;
  playAgain: string;
  nextShape: string;
  saveGame: string;
  loadGame: string;
}> = {
  'en-US': {
    title: 'Tetris ',
    paused: 'Game is paused',
    pressKeyToResume(key) {
      return <>Press {key} to resume</>;
    },
    instructions:
      'Control the game using WSAD or arrow keys. Pause using the ESC key',
    score: 'Score: ',
    gameOver: 'Game Over!',
    yourScore: 'Your score was: ',
    yourBestScore: 'Your best score is: ',
    playAgain: 'Play again?',
    nextShape: 'Next Shape: ',
    saveGame: 'Save game',
    loadGame: 'Load game',
  },
};

export const stateReducer = generateReducer<JSX.Element, StatesWithParameters>({
  MainState({ action: { parameters, ...state } }) {
    return (
      <div
        className="grid grid-cols-4"
        style={{
          width: '100vmin',
          height: '100vmin',
        }}
      >
        <span />
        {state.paused && (
          <div className="absolute inset-0 flex items-center justify-center w-screen h-screen text-4xl text-center bg-black opacity-75">
            <span>
              {languageStrings[parameters.language].paused}
              <br />
              {languageStrings[parameters.language].pressKeyToResume(
                <span className="rounded-xl p-px text-black bg-white">ESC</span>
              )}
              <br />
              <div className="flex gap-4">
                <button
                  type="button"
                  className={fancyButtonStyles}
                  onClick={(): void =>
                    parameters.dispatch({
                      type: 'SaveGameAction',
                    })
                  }
                >
                  {languageStrings[parameters.language].saveGame}
                </button>
                <button
                  type="button"
                  className={fancyButtonStyles}
                  disabled={localStorage.getItem('state') === null}
                  onClick={(): void =>
                    parameters.dispatch({
                      type: 'LoadGameAction',
                    })
                  }
                >
                  {languageStrings[parameters.language].loadGame}
                </button>
              </div>
            </span>
          </div>
        )}
        <div className="bg-gradient-to-tr from-yellow-400 to-purple-400 col-span-2 p-2">
          <div className="h-full grid grid-cols-10 gap-0.5">
            {state.board.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell, index) => (
                  <Cell key={index} color={SHAPES[cell].color} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-2 overflow-hidden">
          {languageStrings[parameters.language].instructions}
          <br />
          <span className="text-4xl">
            {languageStrings[parameters.language].score} {state.score}
          </span>
          <br />
          {state.nextShape !== '_' && (
            <span className="pt-2 text-4xl">
              {languageStrings[parameters.language].nextShape} {state.nextShape}
            </span>
          )}
        </div>
      </div>
    );
  },
  GameOverState({ action: { parameters, ...state } }) {
    return (
      <div className="flex items-center justify-center text-3xl text-center">
        <span>
          <h1 className="pb-4 text-6xl">
            {languageStrings[parameters.language].gameOver}
          </h1>
          <h2>
            {languageStrings[parameters.language].yourScore} {state.score}
          </h2>
          <h2>
            {languageStrings[parameters.language].yourBestScore}{' '}
            {state.bestScore}
          </h2>
          <button
            type="button"
            className={fancyButtonStyles}
            onClick={(): void =>
              parameters.dispatch({ type: 'RestartGameAction' })
            }
          >
            {languageStrings[parameters.language].playAgain}
          </button>
        </span>
      </div>
    );
  },
});
