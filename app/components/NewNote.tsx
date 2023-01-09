import styles from "./NewNote.css";
import {
  Form,
  useActionData,
  useTransition as useNavigation,
} from "@remix-run/react";

export default function NewNote() {
  const data = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
