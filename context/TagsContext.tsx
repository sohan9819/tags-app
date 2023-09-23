'use client';

import React, { useContext, createContext, useReducer, useEffect } from 'react';
import {
  Tags,
  ActionTypes,
  TagsContextProviderProps,
  TagsContextState,
} from './TagsContext.types';
import reducer from '@/reducers/tagsReducer';

const TagsContext = createContext({} as TagsContextState);

const TagsContextProvider = ({ children }: TagsContextProviderProps) => {
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
