import { EditorElementType } from "@/lib/constants";

export type EditorElement = {
  id: string;
  name: string;
  type: EditorElementType;
  styles: React.CSSProperties;
  content: EditorElement[] | {};
};

export type Editor = {
  elements: EditorElement[];
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

// INITIAL STATES
const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      id: "_body",
      name: "Body",
      type: "_body",
      styles: {},
      content: [],
    },
  ],
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

//ACTIONS

export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        element: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        element: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        element: EditorElement;
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" };

//TODO: Error Management
// ACTIONS
const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") return [];
  return editorArray.map((el) => {
    if (el.id === action.payload.containerId && Array.isArray(el.content))
      return {
        ...el,
        content: [...el.content, action.payload.element],
      };
    else if (el.content && Array.isArray(el.content)) {
      return {
        ...el,
        content: addAnElement(el.content, action),
      };
    }
    return el;
  });
};

//TODO:  updateAnElement

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") return [];

  return editorArray.map((el) => {
    if (el.id === action.payload.element.id)
      return { ...el, ...action.payload.element };
    else if (el.content && Array.isArray(el.content))
      return { ...el, content: updateAnElement(el.content, action) };
    return el;
  });
};

//TODO: DeleteAnElement

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
) => {
  if (action.type !== "DELETE_ELEMENT") return [];

  return editorArray.filter((el) => {
    if (el.id === action.payload.element.id) return false;
    else if (el.content && Array.isArray(el.content))
      el.content = deleteAnElement(el.content, action);
    return true;
  });
};

// TODO: Provider

//TODO: `useEditor`
