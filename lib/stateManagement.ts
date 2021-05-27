/*
 *
 * Generator of type safe-reducer and dispatches
 * Replaces the need for switch(){} statements
 * This code is based on https://github.com/maxxxxxdlp/typesafe_reducer
 *
 *
 */

export interface Action<ACTION_NAME extends string> {
  type: ACTION_NAME;
}

export interface State<STATE_NAME extends string> {
  type: STATE_NAME;
}

type GenerateReducerDictionary<STATE, ACTION extends Action<string>> = {
  [actionType in ACTION['type']]: (props: {
    state: STATE;
    action: Extract<ACTION, Action<actionType>>;
  }) => STATE;
};

type GenerateDispatchDictionary<ACTION extends Action<string>> = {
  [actionType in ACTION['type']]: (
    action: Extract<ACTION, Action<actionType>>
  ) => void;
};

function assertExhaustive(caseType: never): never {
  throw new Error(
    `Non-exhaustive switch. Unhandled case:${caseType as string}`
  );
}

export const generateReducer =
  <STATE, ACTION extends Action<string>>(
    object: GenerateReducerDictionary<STATE, ACTION>
  ): ((state: STATE, key: ACTION) => STATE) =>
  <Key2 extends keyof typeof object>(state: STATE, action: Action<Key2>) =>
    object != undefined && typeof object[action.type] === 'function'
      ? object[action.type]({ state, action: action as any })
      : assertExhaustive(action.type as never);

export const generateDispatch =
  <ACTION extends Action<string>>(
    object: GenerateDispatchDictionary<ACTION>
  ): ((key: ACTION) => void) =>
  <Key2 extends keyof typeof object>(action: Action<Key2>) =>
    object != undefined && typeof object[action.type] === 'function'
      ? object[action.type](action as any)
      : assertExhaustive(action.type as never);
