import { Action, generateReducer, State } from '../../../lib/stateManagement';
import React                              from 'react';
import LanguageContext
                                          from '../../../components/LanguageContext';
import {
  AvailableLanguages,
  LanguageStringsStructure,
}                                          from '../../../lib/languages';
import { BOARD_X, BOARD_Y, SHAPES, SPEED } from './config';


type GameOverState = State<'GameOverState'> & {
  score: number,
  bestScore: number,
}

type MainState = State<'MainState'> & {
  board: (keyof typeof SHAPES)[][],
  score: number,
  bestScore: number,
  currentShape: keyof typeof SHAPES,
  currentShapeLocation: Record<number,Record<number,true>>,
  nextShape: keyof typeof SHAPES,
  paused: boolean,
  // nextShape
}

type States =
  MainState
  | GameOverState;

enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ROTATE
}

type MoveAction = Action<'MoveAction'> & {
  direction: DIRECTION,
}

type SpawnRandomShapeAction = Action<'SpawnRandomShapeAction'>;

type RestartGameAction = Action<'RestartGameAction'>;

type TogglePauseGame = Action<'TogglePauseGame'>;

type GravityAction = Action<'GravityAction'> & {
  seed: number,
};

type Actions =
  MoveAction
  | SpawnRandomShapeAction
  | RestartGameAction
  | TogglePauseGame
  | GravityAction;


function mainState(state: States): MainState {
  if (state.type !== 'MainState')
    throw new Error('Action called from wrong state');
  return state;
}

const gameOverState = (state: MainState):GameOverState => ({
  type: 'GameOverState',
  score: state.score,
  bestScore: state.bestScore,
});

const getInitialState = (bestScore = 0): MainState => (
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

const reducer = generateReducer<States, Actions>({
  'MoveAction': ({state: initialState, /*action*/}) => {
    const state = mainState(initialState);

    //TODO: finish this
    //TODO: work on rotate too
    return state;
  },
  'SpawnRandomShapeAction': ({state: initialState}) => {
    const state = mainState(initialState);

    //TODO: finish this
    return state;
  },
  'RestartGameAction': ({state}) =>
    getInitialState(state.bestScore),
  'TogglePauseGame': ({state}) => (
    {
      ...mainState(state),
      paused: !mainState(state).paused,
    }
  ),
  'GravityAction': ({state: initialState, action: {seed}}) => {
    const state = mainState(initialState);
    let board: MainState['board'];
    let currentShapeLocation:MainState['currentShapeLocation'] =
      state.currentShapeLocation;
    const shapeNames = Object.keys(SHAPES).filter(shapeName=>shapeName!=='_');
    let nextShape = state.nextShape;
    let currentShape = state.currentShape;

    if(state.nextShape === '_')
      nextShape = shapeNames[seed % shapeNames.length];

    if (Object.keys(state.currentShapeLocation).length === 0) {
      const shapeDefinition = SHAPES[nextShape].definition;
      const shapeWidth = shapeDefinition[0].length;
      const shapeOffset = Math.round((BOARD_X-shapeWidth)/2);

      if(
        state.board.some((row, rowIndex)=>
          row.some((cell, cellIndex)=>
            shapeDefinition[rowIndex]?.[cellIndex-shapeOffset] === '1' &&
            cell !== '_'
          )
        )
      )
        return gameOverState(state);

      function updateCurrentShape(rowIndex:number, cellIndex:number){

        if(!currentShapeLocation)
          currentShapeLocation = {};
        if(!(rowIndex in currentShapeLocation))
          currentShapeLocation[rowIndex] = {};
        if(!(cellIndex in currentShapeLocation[rowIndex]))
          currentShapeLocation[rowIndex][cellIndex] = true;

        return nextShape;
      }

      board = state.board.map((row, rowIndex)=>
        row.map((cell, cellIndex)=>
          shapeDefinition[rowIndex]?.[cellIndex-shapeOffset] === '1' ?
            updateCurrentShape(rowIndex,cellIndex) :
            cell
        )
      );

      currentShape = nextShape;
      nextShape = '_';
    }
    else {

      const newShapeLocation = Object.fromEntries(
        Object.entries(state.currentShapeLocation).map(([rowIndex, row])=>
          [
            (parseInt(rowIndex)+1).toString().toString(),
            row
          ]
        )) as Record<number, Record<number, true>>;
      if(
        Object.keys(newShapeLocation).some(rowIndex=>
          parseInt(rowIndex)>=BOARD_Y
        ) ||
        state.board.some((row, rowIndex)=>
          row.some((cell, cellIndex)=>
            newShapeLocation[rowIndex]?.[cellIndex] &&
            !currentShapeLocation[rowIndex]?.[cellIndex] &&
            cell !== '_'
          )
        )
      ) {
        currentShapeLocation = {};
        board = state.board;
      }

      else {
        board = state.board.map((row, rowIndex)=>
          row.map((cell, cellIndex)=>
            newShapeLocation[rowIndex]?.[cellIndex] ?
              state.currentShape :
              currentShapeLocation[rowIndex]?.[cellIndex] ?
                '_' :
                cell
          )
        );
        currentShapeLocation = newShapeLocation;
      }
    }

    return {
      ...state,
      board,
      currentShapeLocation,
      currentShape,
      nextShape,
    };
  },
});


type StatesWithParameters = States & {
  parameters: {
    dispatch: (action: Actions) => void,
    language: AvailableLanguages['type'],
  }
};

function Cell({
  color,
}: {
  color: typeof SHAPES[string]['color']
}) {
  return <div
    style={{
      backgroundColor: color,
    }}
  />;
}

const languageStrings: LanguageStringsStructure<{
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

const stateReducer = generateReducer<JSX.Element, StatesWithParameters>({
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
        {/* TODO: show next shape here*/}
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
              seed: Math.floor(Math.random()*100),
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