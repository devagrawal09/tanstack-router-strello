import {
  queryOptions,
  createMutation,
  useQueryClient,
} from "@tanstack/solid-query";
import {
  createColumn,
  createItem,
  deleteColumn,
  deleteItem,
  getBoard,
  moveColumn,
  moveItem,
  updateBoard,
  updateColumn,
  updateItem,
} from "./data";

export const boardQueries = {
  detail: () =>
    queryOptions({
      queryKey: ["board"],
      queryFn: () => getBoard(),
    }),
};

export function useCreateColumnMutation() {
  const queryClient = useQueryClient();
  return createMutation(() => ({
    mutationFn: createColumn,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();
      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,

              columns: [
                ...board.columns,
                {
                  ...variables,
                  order: board.columns.length + 1,
                },
              ],
            }
          : undefined
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: boardQueries.detail().queryKey,
      }),
  }));
}

export function useCreateCardMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: createItem,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();
      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              notes: [
                ...board.notes,
                {
                  ...variables,
                  order: board.notes.length + 1,
                },
              ],
            }
          : undefined
      );
    },
  }));
}

export function useUpdateCardMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: updateItem,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();
      queryClient.setQueryData(
        boardQueries.detail().queryKey,

        (board) =>
          board
            ? {
                ...board,
                notes: board.notes.map((note) =>
                  note.id === variables.id
                    ? {
                        ...note,
                        ...variables,
                      }
                    : note
                ),
              }
            : undefined
      );
    },
  }));
}

export function useDeleteCardMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: deleteItem,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              notes: board.notes.filter((note) => note.id !== variables.id),
            }
          : undefined
      );
    },
  }));
}

export function useDeleteColumnMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: deleteColumn,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              columns: board.columns.filter((c) => c.id !== variables.id),
            }
          : undefined
      );
    },
  }));
}

export function useUpdateBoardMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: updateBoard,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              title: variables.title,
            }
          : undefined
      );
    },
  }));
}

export function useUpdateColumnMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: updateColumn,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === variables.id
                  ? {
                      ...column,
                      title: variables.title,
                    }
                  : column
              ),
            }
          : undefined
      );
    },
  }));
}

export function useMoveCardMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: moveItem,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              notes: board.notes.map((note) => {
                if (note.id === variables.id) {
                  return {
                    ...note,
                    ...variables,
                  };
                }

                return note;
              }),
            }
          : undefined
      );
    },
  }));
}

export function useMoveColumnMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: moveColumn,
    onMutate: async (variables) => {
      // await queryClient.cancelQueries();

      queryClient.setQueryData(boardQueries.detail().queryKey, (board) =>
        board
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === variables.id
                  ? {
                      ...column,
                      order: variables.order,
                    }
                  : column
              ),
            }
          : undefined
      );
    },
  }));
}
