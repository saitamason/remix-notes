import { prisma } from "./database.server";

export interface Note {
  id: string;
  title: string;
  content: string;
}

export const addNote = async (title: string, content: string) => {
  try {
    return await prisma.note.create({ data: { title, content } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const notes = await prisma.note.findMany();
    return notes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
