import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { INote } from "../../interfaces/note.interface";
import truncate from "../../utils/truncate";

interface NoteCardProps {
  note: INote;
  onOpen: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onOpen }) => {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, fontWeight: 600 }}
          variant="h2"
          gutterBottom
        >
          {note.title}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography
          variant="body2"
          sx={{
            textOverflow: "ellipsis",
          }}
        >
          {truncate(note.text, 100)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mt: "auto",
        }}
      >
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
