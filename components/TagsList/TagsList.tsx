'use client';

import React, { useRef } from 'react';
import styles from './TagsList.module.css';
import Tag from '../Tag/Tag';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';

const TagsList = () => {
  const { selectedTags, tagsDispatch } = useTagsContext();

  // Save reference for dragItem and dragOverItem
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Handle Drag End
  const handleSort = (e: React.DragEvent<HTMLLIElement>) => {
    const element = e.target as HTMLElement;
    element.style.opacity = '1';

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
    tagsDispatch({ type: ActionTypes.UPDATE, payload: _selectedTags });
  };

  return (
    <ol className={styles.tag__list}>
      {selectedTags.length > 0 &&
        selectedTags?.map((tagName, index) => (
          <Tag
            key={index}
            draggable
            onDragStart={(e) => {
              const element = e.target as HTMLElement;
              element.style.opacity = '0.4';
              dragItem.current = index;
            }}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            index={index}
            tagName={tagName}
          />
        ))}

      {/* Add the input for the next tag */}
      {selectedTags.length < 10 ? (
        <Tag type='edit' tagName='Add your skill' index={selectedTags.length} />
      ) : (
        ''
      )}

      {/* Fill the remaining place with muted tags */}
      {selectedTags.length < 9
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
