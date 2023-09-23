type TagsContextProviderProps = {
  children: React.ReactNode;
};
enum ActionTypes {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  REORDER = 'reorder',
  UPDATE = 'update',
}
type SelectedTags = string[];
type Action =
  | {
      type: ActionTypes.ADD;
      payload: string;
    }
  | {
      type: ActionTypes.UPDATE;
      payload: SelectedTags;
    }
  | {
      type: ActionTypes.DELETE;
      payload: number;
    }
  | {
      type: ActionTypes.EDIT;
      payload: { index: number; value: string };
    };

type TagsContextState = {
  selectedTags: SelectedTags;
  tagsDispatch: React.Dispatch<Action>;
};

export { ActionTypes };
export type {
  TagsContextProviderProps,
  SelectedTags,
  Action,
  TagsContextState,
};
