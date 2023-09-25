type TagsContextProviderProps = {
  children: React.ReactNode;
};
enum ActionTypes {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  UPDATE = 'update',
  CLEAR = 'clear',
  REORDER = 'reorder',
}
type Tags = string[];
type Action =
  | {
      type: ActionTypes.ADD;
      payload: string;
    }
  | {
      type: ActionTypes.UPDATE;
      payload: Tags;
    }
  | {
      type: ActionTypes.DELETE;
      payload: number;
    }
  | {
      type: ActionTypes.EDIT;
      payload: { index: number; value: string };
    }
  | {
      type: ActionTypes.CLEAR;
      payload?: {};
    }
  | {
      type: ActionTypes.REORDER;
      payload: { itemPos: number; targetPos: number };
    };

type TagsContextState = {
  selectedTags: Tags;
  tagsDispatch: React.Dispatch<Action>;
};

export { ActionTypes };
export type { TagsContextProviderProps, Tags, Action, TagsContextState };
