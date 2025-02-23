import invariant from "tiny-invariant";
import { BoardData } from "./Board";
import { setTimeoutPromise } from "~/lib/utils";
import { NoteId } from "./Note";
import { ColumnId } from "./Column";

const DELAY = 1000;

const board: BoardData = {
  board: {
    title: "First board",
    color: "#e0e0e0",
  },
  columns: [
    {
      id: "1" as ColumnId,
      title: "First column",
      order: 1,
    },
    {
      id: "2" as ColumnId,
      title: "Second column",
      order: 2,
    },
    {
      id: "3" as ColumnId,
      title: "Third column",
      order: 3,
    },
  ],
  notes: [],
};

export const getBoard = async () => {
  await setTimeoutPromise(DELAY);
  console.log({ board });
  return structuredClone(board);
};

export const createColumn = async (newColumn: {
  id: ColumnId;
  title: string;
}) => {
  await setTimeoutPromise(DELAY);

  board.columns = [
    ...board.columns,
    {
      ...newColumn,
      order: board.columns.length + 1,
    },
  ];
};

export const createItem = async (data: {
  id: NoteId;
  column: string;
  body: string;
  order: number;
}) => {
  await setTimeoutPromise(DELAY);

  board.notes = [...board.notes, data];
};

export const deleteItem = async (data: { id: NoteId }) => {
  await setTimeoutPromise(DELAY);

  board.notes = board.notes.filter((note) => note.id !== data.id);
};

export const updateItem = async (data: { id: NoteId; body: string }) => {
  await setTimeoutPromise(DELAY);

  const note = board.notes.find((note) => note.id === data.id);
  invariant(note, "missing note");

  note.body = data.body;
};

export const updateColumn = async (data: { id: string; title: string }) => {
  await setTimeoutPromise(DELAY);

  const column = board.columns.find((column) => column.id === data.id);
  invariant(column, "missing column");

  column.title = data.title;
};

export const updateBoard = async (data: { title: string }) => {
  await setTimeoutPromise(DELAY);

  board.board.title = data.title;
};

export const deleteColumn = async (data: { id: string }) => {
  await setTimeoutPromise(DELAY);

  board.columns = board.columns.filter((column) => column.id !== data.id);
  board.notes = board.notes.filter((note) => note.column !== data.id);
};

export const moveItem = async (data: {
  id: NoteId;
  column: ColumnId;
  order: number;
}) => {
  await setTimeoutPromise(DELAY);

  const note = board.notes.find((note) => note.id === data.id);
  invariant(note, "missing note");

  note.column = data.column;
  note.order = data.order;
};

export const moveColumn = async (data: { id: ColumnId; order: number }) => {
  await setTimeoutPromise(DELAY);

  const column = board.columns.find((column) => column.id === data.id);
  invariant(column, "missing column");

  column.order = data.order;
};
