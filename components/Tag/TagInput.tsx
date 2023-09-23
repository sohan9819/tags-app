'use client';

import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select/creatable';
import { TagInput, OptionType } from './Tag.types';

const TagInput = ({
  className,
  defaultValue = {
    value: 0,
    label: '',
  },
  type = 'default',
  setIsEditable,
  ...props
}: TagInput) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const defaultIndex = defaultValue.value;
  const { tagsDispatch } = useTagsContext();

  useEffect(() => {
    (async function fetchOptions() {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const { items } = await res.json();
        setOptions(
          items.map((item: { name: string }, index: number) => ({
            value: index,
            label: item.name,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onSubmitHandler = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (selectedOption.label !== '') {
      if (type === 'edit' && setIsEditable) {
        tagsDispatch({
          type: ActionTypes.EDIT,
          payload: { index: defaultIndex, value: selectedOption.label },
        });
        setIsEditable(false);
      } else {
        tagsDispatch({
          type: ActionTypes.ADD,
          payload: selectedOption.label,
        });
      }

      setSelectedOption({ value: 0, label: '' });
    }
  };

  const onChangeHandler = (
    selectedOption: {
      value: number;
      label: string;
    } | null
  ) => {
    if (selectedOption) setSelectedOption(selectedOption);
  };

  return (
    <form className={className} onSubmit={onSubmitHandler}>
      <Select
        key={`my_unique_select_key__${selectedOption}`}
        classNamePrefix='select'
        value={selectedOption}
        onChange={onChangeHandler}
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        name='color'
        options={options}
        placeholder={'Add your skill'}
        onCreateOption={(value) => {
          if (value !== '') {
            type === 'edit'
              ? tagsDispatch({
                  type: ActionTypes.EDIT,
                  payload: { index: defaultIndex, value: value },
                })
              : tagsDispatch({
                  type: ActionTypes.ADD,
                  payload: value,
                });

            setIsEditable ? setIsEditable(false) : '';
          }
        }}
      />
    </form>
  );
};

export default TagInput;
