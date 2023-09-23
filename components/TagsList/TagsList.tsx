'use client';

import React, { useEffect, useState } from 'react';
import styles from './tagslist.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Tag from '../Tag/Tag';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';

const TagsList = () => {
  // const [tagItems, setTagItems] = useState<string[]>([]);
  const { selectedTags, tagsDispatch } = useTagsContext();

  // Save reference for dragItem and dragOverItem
  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  // Handle Drag End
  const handleSort = (e: React.DragEvent<HTMLLIElement>) => {
    // Check whether it is dragged to another position
    if (dragItem === dragOverItem) return;

    // duplicate the actual array
    let _selectedTags = [...selectedTags];

    // remove and save the dragged item content
    const draggedItemContent = _selectedTags.splice(dragItem.current!, 1)[0];

    // switch position
    _selectedTags.splice(dragOverItem.current!, 0, draggedItemContent);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    // setTagItems(_tagItems);
    tagsDispatch({ type: ActionTypes.UPDATE, payload: _selectedTags });
  };

  return (
    <ol className={styles.tag__list}>
      {selectedTags.length > 0 ? (
        selectedTags?.map((tagName, index) => (
          <Tag
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            index={index}
            tagName={tagName}
          />
        ))
      ) : (
        <>
          <Tag
            type='edit'
            tagName='Add your skill'
            index={selectedTags.length}
          />
          {[...Array(9)].map((_, index) => (
            <Tag
              tagName='Add your skill'
              index={selectedTags.length + index + 1}
              type='mute'
              key={selectedTags.length + index + 1}
            />
          ))}
        </>
      )}
      {selectedTags.length < 10 ? (
        <Tag type='edit' tagName='Add your skill' index={selectedTags.length} />
      ) : (
        ''
      )}

      {selectedTags.length < 9 && selectedTags.length > 0
        ? [...Array(9 - selectedTags.length)]?.map((_, index) => (
            <Tag
              tagName='Add your skill'
              index={selectedTags.length + index + 1}
              key={selectedTags.length + index + 1}
              type='mute'
            />
          ))
        : ''}
    </ol>
  );
};

export default TagsList;
