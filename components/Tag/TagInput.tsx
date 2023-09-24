'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select/creatable';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';
import { TagInput, OptionType } from './Tag.types';

const TagInput = ({
  className,
  defaultValue = { value: 0, label: '' },
  type = 'default',
  setIsEditable,
  index,
  ...props
}: TagInput) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    defaultValue
  );
  const defaultIndex = defaultValue.value;
  const { tagsDispatch } = useTagsContext();
  const maxInputLength = 20;

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const { items } = await res.json();
        const mappedOptions = items.map(
          (item: { name: string }, index: number) => ({
            value: index,
            label: item.name,
          })
        );
        setOptions(mappedOptions);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const onSubmitHandler = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (selectedOption?.label) {
      type === 'edit' && setIsEditable
        ? tagsDispatch({
            type: ActionTypes.EDIT,
            payload: { index: defaultIndex, value: selectedOption!.label },
          })
        : tagsDispatch({
            type: ActionTypes.ADD,
            payload: selectedOption!.label,
          });

      if (setIsEditable) {
        setIsEditable(false);
      }

      setSelectedOption({ value: 0, label: '' });
    }
  };

  const onChangeHandler = (
    selectedOption: { value: number; label: string } | null
  ) => {
    if (selectedOption) setSelectedOption(selectedOption);
  };

  const onCreateOptionHandler = (value: string) => {
    if (value !== '') {
      const payload = type === 'edit' ? { index: defaultIndex, value } : value;

      type === 'edit'
        ? tagsDispatch({
            type: ActionTypes.EDIT,
            payload: { index: defaultIndex, value: value },
          })
        : tagsDispatch({
            type: ActionTypes.ADD,
            payload: value,
          });

      if (setIsEditable) {
        setIsEditable(false);
      }
    }
  };

  return (
    <form className={className} onSubmit={onSubmitHandler} {...props}>
      <Select
        classNamePrefix='select'
        defaultValue={selectedOption?.label === '' ? null : selectedOption}
        onInputChange={(inputValue) =>
          inputValue.length <= maxInputLength
            ? inputValue
            : inputValue.substr(0, maxInputLength)
        }
        value={selectedOption?.label === '' ? null : selectedOption}
        onChange={onChangeHandler}
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        name='color'
        options={options}
        placeholder={`${index}. Add your skill`}
        onCreateOption={onCreateOptionHandler}
        styles={{
          dropdownIndicator: () => ({ display: 'none' }),
          control: (base, state) => ({
            ...base,
            background: state.isFocused ? '' : 'rgb(207, 251, 242)',
            width: '100%',
            height: '100%',
            border: 'none',
            padding: '0.2rem 0.8rem',
          }),
        }}
      />
    </form>
  );
};

export default TagInput;
