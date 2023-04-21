import React, { useEffect, useState } from "react";
import { IFolder } from "../../interfaces/folder.interface";
import { INote } from "../../interfaces/note.interface";
import api from "../../api";
import { Button, Stack } from "@mui/material";
import FoldersList from "./FoldersList";
import NoteModal from "./NoteModal";
import NoteCard from "./NoteCard";

const defaultNote = {
  text: "",
  tags: [],
  title: "",
  folderId: null,
};

const Notes = () => {
  const [loading, setLoading] = useState(true);

  const [folders, setFolders] = useState<IFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote>(defaultNote);
  const [modalOpen, setModalOpen] = useState(false);

  const getNotes = async () => {
    if (activeFolder) {
      setNotes(await api.getNotesInFolder(activeFolder));
    } else {
      setNotes(await api.getNotesNotInFolder());
    }

    setLoading(false);
  };

  const onCreateNewNote = () => {
    setSelectedNote({
      title: "",
      text: "",
      tags: [],
      folderId: activeFolder,
    });

    setModalOpen(true);
  };

  const onSaveNote = async (noteData: Partial<INote>) => {
    await api.createNote({
      ...selectedNote,
      ...noteData,
    });
    setModalOpen(false);
    setSelectedNote(defaultNote);
    await getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        maxHeight: "calc(100vh - 64px)",
        overflowY: "scroll",
      }}
      gap="20px"
    >
      <FoldersList />
      <Stack
        sx={{
          width: "100%",
          pr: "20px",
        }}
      >
        <Button variant="contained" onClick={onCreateNewNote}>
          Create note
        </Button>

        <Stack
          direction="row"
          flexWrap="wrap"
          gap="10px"
          sx={{
            mt: "20px",
            pr: "40px",
          }}
        >
          {notes.map((note) => (
            <NoteCard note={note} onOpen={() => {}} />
          ))}
        </Stack>
      </Stack>

      <NoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        note={selectedNote}
        onSave={onSaveNote}
      />
    </Stack>
  );
};

export default Notes;
