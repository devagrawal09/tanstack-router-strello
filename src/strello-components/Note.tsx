import { BsPlus, BsTrash } from "solid-icons/bs";
import { RiEditorDraggable } from "solid-icons/ri";
import { Match, Switch, createSignal } from "solid-js";
import { DragTypes } from "./Board";
import { ColumnId } from "./Column";
import { getIndexBetween } from "~/lib/utils";
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useMoveCardMutation,
  useUpdateCardMutation,
} from "./queries";

export type NoteId = string & { __brand?: "NoteId" };

export type Note = {
  id: NoteId;
  column: ColumnId;
  order: number;
  body: string;
};

export function Note(props: { note: Note; previous?: Note; next?: Note }) {
  const { mutate: updateAction } = useUpdateCardMutation();
  const { mutate: deleteAction } = useDeleteCardMutation();
  const { mutate: moveNoteAction } = useMoveCardMutation();

  let input: HTMLTextAreaElement | undefined;

  const [isBeingDragged, setIsBeingDragged] = createSignal(false);

  const [acceptDrop, setAcceptDrop] = createSignal<"top" | "bottom" | false>(
    false
  );

  return (
    <div
      style={{
        opacity: isBeingDragged() ? 0.25 : 1,
        "border-top":
          acceptDrop() === "top" ? "2px solid red" : "2px solid transparent",
        "border-bottom":
          acceptDrop() === "bottom" ? "2px solid red" : "2px solid transparent",
      }}
      draggable="true"
      class="px-1 py-2 w-full bg-slate-200 text-lg flex justify-between items-center space-x-1 "
      onDragStart={(e) => {
        e.dataTransfer?.setData(DragTypes.Note, props.note.id.toString());
      }}
      onDrag={() => {
        setIsBeingDragged(true);
      }}
      onDragEnd={() => {
        setIsBeingDragged(false);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!e.dataTransfer?.types.includes(DragTypes.Note)) {
          setAcceptDrop(false);
          return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = (rect.top + rect.bottom) / 2;
        const isTop = e.clientY < midpoint;

        setAcceptDrop(isTop ? "top" : "bottom");
      }}
      onDragExit={() => {
        setAcceptDrop(false);
      }}
      onDragLeave={() => {
        setAcceptDrop(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer?.types.includes(DragTypes.Note)) {
          const noteId = e.dataTransfer?.getData(DragTypes.Note) as
            | NoteId
            | undefined;

          action: if (noteId && noteId !== props.note.id) {
            if (acceptDrop() === "top") {
              if (props.previous && props.previous?.id === noteId) {
                break action;
              }
              moveNoteAction({
                id: noteId,
                column: props.note.column,
                order: getIndexBetween(props.previous?.order, props.note.order),
              });
            }

            if (acceptDrop() === "bottom") {
              if (props.previous && props.next?.id === noteId) {
                break action;
              }
              moveNoteAction({
                id: noteId,
                column: props.note.column,
                order: getIndexBetween(props.note.order, props.next?.order),
              });
            }
          }
        }

        setAcceptDrop(false);
      }}
    >
      <div>
        <RiEditorDraggable size={25} class="cursor-move" />
      </div>
      <textarea
        class="text-lg w-full
        bg-slate-300 text-black p-2 rounded"
        ref={input}
        style={{
          resize: "none",
        }}
        onBlur={(e) =>
          updateAction({
            id: props.note.id,
            body: (e.target as HTMLTextAreaElement).value,
          })
        }
      >
        {`${props.note.body}`}
      </textarea>
      <button
        class="btn btn-ghost btn-sm btn-circle"
        onClick={() => deleteAction({ id: props.note.id })}
      >
        <BsTrash />
      </button>
    </div>
  );
}

export function AddNote(props: {
  column: ColumnId;
  length: number;
  onAdd: () => void;
}) {
  const [active, setActive] = createSignal(false);
  const { mutate: addNote } = useCreateCardMutation();

  let inputRef: HTMLInputElement | undefined;

  return (
    <div class="w-full flex justify-center p-2">
      <Switch>
        <Match when={active()}>
          <form
            class="flex flex-col space-y-2 card w-full"
            onSubmit={(e) => {
              e.preventDefault();
              const body = inputRef?.value.trim() ?? "Note";
              if (body === "") {
                inputRef?.setCustomValidity("Please fill out this field.");
                inputRef?.reportValidity();
                return;
              }
              addNote({
                id: crypto.randomUUID() as NoteId,
                column: props.column,
                body,
                order: props.length + 1,
              });
              inputRef && (inputRef.value = "");
              props.onAdd();
            }}
            onFocusOut={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as any)) {
                setActive(false);
              }
            }}
          >
            <input
              ref={(el) => {
                inputRef = el;
                setTimeout(() => requestAnimationFrame(() => void el.focus()));
              }}
              class="text-white bg-black p-2 w-full rounded"
              placeholder="Add a Note"
              required
            />
            <div class="flex justify-between">
              <button
                class="bg-green-700 text-gray-100 flex justify-center items-center py-2 px-4 gap-2 rounded cursor-pointer hover:bg-gray-900 hover:text-white"
                type="submit"
              >
                Add
              </button>
              <button
                class="bg-red-700 text-gray-100 flex justify-center items-center py-2 px-4 gap-2 rounded cursor-pointer hover:bg-gray-900 hover:text-white"
                type="reset"
                onClick={() => setActive(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Match>
        <Match when={!active()}>
          <button
            class="w-full bg-gray-800 text-gray-100 flex justify-center items-center p-2 gap-2 rounded cursor-pointer hover:bg-gray-900 hover:text-white"
            onClick={() => setActive(true)}
          >
            <BsPlus size={25} /> Add a card
          </button>
        </Match>
      </Switch>
    </div>
  );
}
