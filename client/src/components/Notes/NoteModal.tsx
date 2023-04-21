import React, { useState } from "react";
import { Button, Modal, Stack, styled, TextField } from "@mui/material";
import { INote } from "../../interfaces/note.interface";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    input: {
      fontSize: "24px",
      fontWeight: 600,
    },
    "& fieldset": {
      borderColor: "transparent",
      borderWidth: 0,
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      borderWidth: 0,
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
});

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  note: INote;
  onSave: (noteData: Partial<INote>) => Promise<void>;
}

const NoteModal: React.FC<NoteModalProps> = ({
  open,
  onClose,
  note,
  onSave,
}) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [text, setText] = useState(note?.text ?? "");

  const handleSave = () => {
    onSave({
      text,
      title,
    });
    setText("");
    setTitle("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        <CustomTextField
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomTextField
          placeholder="Write a note"
          multiline
          minRows={5}
          maxRows={20}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          sx={{
            mt: "auto",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </Modal>
  );
};

export default NoteModal;
