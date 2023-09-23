import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Tag.module.css';
import TagInput from './TagInput';
import { useTagsContext } from '@/context/TagsContext';
import { ActionTypes } from '@/context/TagsContext.types';

import { TagProps } from './Tag.types';

const Tag = ({
  index,
  tagName,
  type = 'default',
  className,
  ...props
}: TagProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { tagsDispatch } = useTagsContext();

  useEffect(() => {
    // If clicked outside the tag
    window.addEventListener('click', (e) => {
      setIsEditable(false);
    });
  }, []);

  switch (type) {
    case 'edit':
      return (
        <li
          className={`${className} ${styles.edit}`}
          style={{ gridArea: `tag${index + 1}` }}
        >
          {index + 1} .
          <TagInput className={styles.input} />
        </li>
      );

    case 'mute':
      return (
        <li
          {...props}
          className={`${className} ${styles.mute}`}
          style={{ gridArea: `tag${index + 1}` }}
        >
          <span>
            {index + 1} .{tagName}
          </span>
        </li>
      );

    default:
      return isEditable ? (
        <li
          className={`${className} ${styles.edit}`}
          style={{ gridArea: `tag${index + 1}` }}
          onClick={(e) => e.stopPropagation()}
        >
          {index + 1} .
          <TagInput
            className={styles.input}
            defaultValue={{ value: index, label: tagName }}
            setIsEditable={setIsEditable}
            type='edit'
          />
        </li>
      ) : (
        <li
          className={styles.tag}
          {...props}
          onDoubleClick={(e) => {
            setIsEditable(true);
            e.stopPropagation();
          }}
        >
          <span>
            {index + 1} .{tagName}
          </span>
          <button
            className={styles.button}
            onClick={() =>
              tagsDispatch({ type: ActionTypes.DELETE, payload: index })
            }
          >
            <AiOutlineCloseCircle />
          </button>
        </li>
      );
  }
};

export default Tag;
