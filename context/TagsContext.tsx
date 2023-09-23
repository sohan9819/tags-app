'use client';

import React, {
  useContext,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react';

import {
  SelectedTags,
  Action,
  ActionTypes,
  TagsContextProviderProps,
  TagsContextState,
} from './TagsContext.types';

const TagsContext = createContext({} as TagsContextState);

const TagsContextProvider = ({ children }: TagsContextProviderProps) => {
  const reducer = (state: SelectedTags, { type, payload }: Action) => {
    switch (type) {
      case ActionTypes.UPDATE:
        return [...payload];
      case ActionTypes.ADD:
        return [...state, payload];
      case ActionTypes.EDIT:
        console.log('Editing ', payload);
        state[payload.index] = payload.value;
        return [...state];
      case ActionTypes.DELETE:
        return [
          ...state
            .slice(0, payload as number)
            .concat(state.slice((payload as number) + 1)),
        ];
      case ActionTypes.REORDER:
        return state;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [] as SelectedTags);

  useEffect(() => {
    (async function fetchTags() {
      try {
        const res = await fetch('/api/tag');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        dispatch({ type: ActionTypes.UPDATE, payload: data.items });
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
