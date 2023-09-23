'use client';

import React, {
  useContext,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react';

import {
  Tags,
  Action,
  ActionTypes,
  TagsContextProviderProps,
  TagsContextState,
} from './TagsContext.types';

const TagsContext = createContext({} as TagsContextState);

const updateDb = async (state: Tags) => {
  await fetch('/api/tag', {
    method: 'POST',
    body: JSON.stringify(state),
  })
    .then((res) => {
      console.log(res.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

const TagsContextProvider = ({ children }: TagsContextProviderProps) => {
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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [] as Tags);

  useEffect(() => {
    (async function fetchTags() {
      try {
        const res = await fetch('/api/tag');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        dispatch({ type: ActionTypes.UPDATE, payload: data.tags });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <TagsContext.Provider
      value={{
        selectedTags: state,
        tagsDispatch: dispatch,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

const useTagsContext = () => useContext(TagsContext);

export { TagsContextProvider, useTagsContext };
