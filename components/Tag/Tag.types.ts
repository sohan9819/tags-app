import React from 'react';

export interface TagProps extends React.LiHTMLAttributes<HTMLLIElement> {
  index: number;
  tagName: string;
  type?: 'edit' | 'default' | 'mute';
}

export interface TagInput {
  className: string;
  defaultValue?: OptionType;
  setIsEditable?: (value: React.SetStateAction<boolean>) => void;
  type?: 'edit' | 'default';
}

export type OptionType = {
  value: number;
  label: string;
};
