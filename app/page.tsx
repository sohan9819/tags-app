import ButtonClear from '@/components/Button/ButtonClear';
import styles from './page.module.css';
import TagsList from '@/components/TagsList/TagsList';
import { useTagsContext } from '@/context/TagsContext';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>&#x2022; Things you&apos;re good at!</h1>
      <div className={styles.board}>
        <p className={styles.board__heading}>
          The skills you mention here will help hackathon organizers in
          assessing you as a potential participant.
        </p>
        <TagsList />
        <ButtonClear />
      </div>
    </main>
  );
}
