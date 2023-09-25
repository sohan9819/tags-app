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
  const handleSort = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();

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

  const onDragEnter = (
    event: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    event.preventDefault();
    dragOverItem.current = index;
    tagsDispatch({
      type: ActionTypes.REORDER,
      payload: { itemPos: dragItem.current as number, targetPos: index },
    });
    dragItem.current = index;
  };

  const renderTags = () => {
    return selectedTags?.map((tagName, index) => (
      <Tag
        key={index}
        draggable
        onDragStart={(event) => (dragItem.current = index)}
        onDragEnter={(event) => onDragEnter(event, index)}
        onDragOver={(event) => event.preventDefault()}
        onDragEnd={handleSort}
        index={index}
        tagName={tagName}
      />
    ));
  };

  const renderEditableTags = () => {
    if (selectedTags.length < 10) {
      return (
        <Tag type='edit' tagName='Add your skill' index={selectedTags.length} />
      );
    }
    return null;
  };

  const renderMutedTags = () => {
    const remaining = 9 - selectedTags.length;
    return Array.from({ length: remaining }).map((_, index) => (
      <Tag
        key={selectedTags.length + index + 1}
        tagName='Add your skill'
        index={selectedTags.length + index + 1}
        type='mute'
      />
    ));
  };

  return (
    <ol className={styles.tag__list}>
      {selectedTags.length > 0 && renderTags()}

      {/* Add the input for the next tag */}
      {renderEditableTags()}

      {/* Fill the remaining place with muted tags */}
      {selectedTags.length < 9 && renderMutedTags()}
    </ol>
  );
};

export default TagsList;
