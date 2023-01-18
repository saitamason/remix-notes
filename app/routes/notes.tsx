import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import type { Note } from "~/data/notes.server";
import { addNote, getNotes } from "~/data/notes.server";

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export function CatchBoundary() {
  const coughtResponse = useCatch();
  const message = coughtResponse.data?.message || "Data not found.";

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export async function loader() {
  const notes = await getNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      { status: 404, statusText: "Not found" }
    );
  }

  return notes;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as unknown as Note;

  if (noteData.title.trim().length < 1) {
    return { message: "Invalid title - must be at least 1 character long." };
  }

  try {
    await addNote(noteData.title, noteData.content);
    return redirect("/notes");
  } catch (error) {
    throw json(
      { message: "Could not save note." },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export const meta: MetaFunction = () => ({
  title: "All notes",
  description: "Manage your notes with ease.",
});

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
