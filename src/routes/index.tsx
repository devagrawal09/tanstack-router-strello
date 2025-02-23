import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { Board } from "~/strello-components/Board";
import EditableText from "~/strello-components/EditableText";
import {
  boardQueries,
  useUpdateBoardMutation,
} from "~/strello-components/queries";

export const Route = createFileRoute("/")({
  component: App,
  // @ts-expect-error
  head: ({ loaderData }) => ({
    title: `Strello`,
  }),
});

function App() {
  const boardQuery = createQuery(boardQueries.detail);

  const updateBoardNameMutation = useUpdateBoardMutation();

  return (
    <Show when={boardQuery.data}>
      {(board) => (
        <main
          class="w-full p-8 space-y-2"
          style={{ "background-color": board().board.color }}
        >
          <h1 class="mb-4">
            <EditableText
              text={
                updateBoardNameMutation.status === "pending"
                  ? updateBoardNameMutation.variables.title
                  : board().board.title
              }
              saveAction={(title) => updateBoardNameMutation.mutate({ title })}
            />
          </h1>

          <div>
            <Board board={board()} />
          </div>
        </main>
      )}
    </Show>
  );
}
