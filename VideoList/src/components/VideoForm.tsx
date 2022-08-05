import { Button, Grid, Modal, Select, OutlinedInput, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Category, VideosRes } from '../common/interfaces';
import { getCategories } from '../services/categories';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

interface VideosFormProps {
  id?: number;
  open: boolean;
  video?: VideosRes;
  authoList?: string[];
  onSave: (arg0: VideosRes) => void;
  onCancel: () => void;
  type: string;
}

export const VideoForm: React.FC<VideosFormProps> = ({ open, video, authoList = [], onSave, onCancel, type }) => {
  const defaultVideo = {
    name: '',
    authorName: '',
    categories: [],
    formats: {
      one: { res: '1080p', size: 1000 },
    },
    id: Math.random() * 10,
    highestQualityFormat: 'one 1080p',
    releaseDate: '2018-08-09',
  };
  const [data, setData] = useState(video || defaultVideo);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);
  console.log('categor', categories);
  console.log('vdeo', video);
  const onChange = (e: any) => {
    console.log('e', e.target.name, e.target.value);
    setData({
      ...data,
      [e.target.name]: [e.target.value],
    });
  };
  const onCategorieChange = (e: any) => {
    const { value } = e.target;
    setData({
      ...data,
      [e.target.name]: typeof value === 'string' ? value.split(',') : value,
    });
  };
  return (
    <div className="w-500">
      <Grid
        container
        spacing={2}
        sx={{
          background: 'white',
          display: 'flex',
          margin: '20px',
          //   justifyContent: 'center',
          flexDirection: 'column',
          //   alignItems: 'center',
        }}>
        <Grid item xs={12}>
          <h2>{type === 'edit' ? 'Edit Video' : 'Add Video'}</h2>
        </Grid>
        <Grid item xs={12} className="form-item-flex">
          <div className="item-label">Video Name:</div>
          <TextField
            required
            style={{ minWidth: '300px' }}
            id="name"
            label="Name"
            // error={data.name === ''}
            // helperText={data.name === '' ? 'Name is Required!' : ' '}
            variant="outlined"
            value={data.name}
            name="name"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} className="form-item-flex">
          <div className="item-label">Video Author: </div>
          <Select
            required
            labelId="author"
            name="authorName"
            id="author"
            value={data.authorName}
            onChange={onChange}
            style={{ minWidth: '300px' }}
            input={<OutlinedInput label="Author" />}
            MenuProps={MenuProps}>
            {authoList.map((ele: string) => (
              <MenuItem key={ele} value={ele}>
                {ele}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} className="form-item-flex">
          <div className="item-label">Viedo Category: </div>
          <Select
            required
            labelId="Video Category"
            id="category"
            multiple
            name="categories"
            value={data.categories}
            onChange={onCategorieChange}
            style={{ minWidth: '300px' }}
            input={<OutlinedInput label="Category" />}
            MenuProps={MenuProps}>
            {categories.map((ele: Category) => (
              <MenuItem key={ele.id} value={ele.name}>
                {ele.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6} sx={{ m: 1 }}>
          <Button sx={{ m: 1 }} variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button sx={{ m: 1 }} variant="contained" onClick={() => onSave(data)}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
