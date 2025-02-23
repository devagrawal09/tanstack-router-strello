import { For, createMemo } from "solid-js";
import { AddColumn, Column, ColumnGap } from "./Column";
import { Note } from "./Note";

export enum DragTypes {
  Note = "application/note",
  Column = "application/column",
}

export type Board = {
  title: string;
  color: string;
};

export type BoardData = {
  board: Board;
  columns: Column[];
  notes: Note[];
};

export function Board(props: { board: BoardData }) {
  const sortedColumns = createMemo(() =>
    props.board.columns.slice().sort((a, b) => a.order - b.order)
  );

  let scrollContainerRef: HTMLDivElement | undefined;

  return (
    <div
      ref={(el) => {
        scrollContainerRef = el;
      }}
      class="pb-8 h-[calc(100vh-160px)] min-w-full overflow-x-auto overflow-y-hidden flex flex-start items-start flex-nowrap"
    >
      <ColumnGap right={sortedColumns()[0]} />
      <For each={sortedColumns()}>
        {(column, i) => (
          <>
            <Column
              column={column}
              board={props.board.board}
              notes={props.board.notes}
            />
            <ColumnGap
              left={sortedColumns()[i()]}
              right={sortedColumns()[i() + 1]}
            />
          </>
        )}
      </For>
      <AddColumn
        onAdd={() => {
          scrollContainerRef &&
            (scrollContainerRef.scrollLeft = scrollContainerRef.scrollWidth);
        }}
      />
    </div>
  );
}
