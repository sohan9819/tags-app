'use client';

import React from 'react';
import styles from './Button.module.css';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';

interface ButtonClearProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonClear = ({ ...props }: ButtonClearProps) => {
  const { selectedTags, tagsDispatch } = useTagsContext();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (window.confirm('Are you sure you want to delete all tags?'))
      tagsDispatch({ type: ActionTypes.CLEAR });
  };

  return (
    <button
      className={styles.btn__clear}
      {...props}
      onClick={onClickHandler}
      disabled={selectedTags.length === 0}
    >
      Clear All
    </button>
  );
};

export default ButtonClear;
