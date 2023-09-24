import { Action, ActionTypes, Tags } from '@/context/TagsContext.types';
import { updateDb } from '@/utils/apiClient';

const reducer = (state: Tags, { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.UPDATE:
      updateDb([...payload]);
      return [...payload];

    case ActionTypes.ADD:
      updateDb([...state, payload]);
      return [...state, payload];

    case ActionTypes.EDIT:
      console.log('Editing ', payload);
      state[payload.index] = payload.value;
      updateDb([...state]);
      return [...state];

    case ActionTypes.DELETE:
      const updatedState = [
        ...state
          .slice(0, payload as number)
          .concat(state.slice((payload as number) + 1)),
      ];
      updateDb(updatedState);
      return updatedState;

    case ActionTypes.CLEAR:
      updateDb([]);
      return [];

    default:
      return state;
  }
};

export default reducer;
