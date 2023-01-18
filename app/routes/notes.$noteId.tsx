import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import type { Note } from "~/data/notes.server";
import { getStoredNotes } from "~/data/notes.server";
import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const note: Note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: { params: { noteId: string } }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote: Note = notes.find((note: Note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find note with the given ID." },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return selectedNote || [];
}

export const meta: MetaFunction = ({ data }: { data: Note }) => ({
  title: data?.title,
  description: data?.content,
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
