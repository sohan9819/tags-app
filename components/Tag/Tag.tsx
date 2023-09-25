import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Tag.module.css';
import TagInput from './TagInput';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';
import { TagProps } from './Tag.types';

const Tag = ({ index, tagName, type = 'default', ...props }: TagProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { tagsDispatch } = useTagsContext();

  useEffect(() => {
    // Add an event listener to handle clicks outside the tag
    const handleOutsideClick = (event: MouseEvent) => {
      setIsEditable(false);
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      // Clean up the event listener when unmounting
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setIsEditable(true);
    event.stopPropagation();
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    tagsDispatch({ type: ActionTypes.DELETE, payload: index });
  };

  switch (type) {
    case 'edit':
      return (
        <li className={styles.edit} style={{ gridArea: `tag${index + 1}` }}>
          {/* {index + 1}. */}
          <TagInput className={styles.input} index={index + 1} />
        </li>
      );

    case 'mute':
      return (
        <li
          {...props}
          className={styles.mute}
          style={{ gridArea: `tag${index + 1}` }}
        >
          <span>
            {index + 1}. {tagName}
          </span>
        </li>
      );

    default:
      return isEditable ? (
        <li
          className={styles.edit}
          style={{ gridArea: `tag${index + 1}` }}
          onClick={(e) => e.stopPropagation()}
        >
          <TagInput
            className={styles.input}
            defaultValue={{ value: index, label: tagName }}
            setIsEditable={setIsEditable}
            type='edit'
            index={index + 1}
          />
        </li>
      ) : (
        <li
          className={styles.tag}
          {...props}
          onDoubleClick={handleDoubleClick}
          style={{
            gridArea: `tag${index + 1}`,
          }}
        >
          <span>
            {index + 1}. {tagName}
          </span>
          <button className={styles.button} onClick={handleDeleteClick}>
            <AiOutlineCloseCircle />
          </button>
        </li>
      );
  }
};

export default Tag;
