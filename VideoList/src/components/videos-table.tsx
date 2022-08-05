import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { VideosRes } from '../common/interfaces';

interface VideosTableProps {
  videos: VideosRes[];
  onEdit: (arg0: number) => void;
  onDelete: (arg0: number) => void;
  onAdd: () => void;
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos, onEdit, onDelete, onAdd }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <div className="add-video">
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add Video
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>highestQualityFormat</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.authorName}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>{video.highestQualityFormat}</TableCell>
              <TableCell>{video.releaseDate}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(video.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(video.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
