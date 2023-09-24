import { Tags } from '@/context/TagsContext.types';

const updateDb = async (state: Tags) => {
  try {
    const res = await fetch('/api/tag', {
      method: 'PUT',
      body: JSON.stringify(state),
    });

    if (!res.ok) {
      throw new Error('Failed to update data');
    }

    console.log(res.body);
  } catch (err) {
    console.error(err);
  }
};

export { updateDb };
