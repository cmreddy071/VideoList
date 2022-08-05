import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Drawer } from '@mui/material';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { VideosRes } from './common/interfaces';
import { SearchBox } from './components/SearchBox';
import { VideoForm } from './components/VideoForm';
const defaultVideo = {
  name: '',
  authorName: '',
  categories: [],
  formats: {
    one: { res: '1080p', size: 1000 },
  },
  highestQualityFormat: 'one 1080p',
};
const App: React.FC = () => {
  const [videos, setVideos] = useState<VideosRes[]>([]);
  const [searchResult, setSearchResult] = useState<VideosRes[]>([]);
  const [videoForEdit, setVideoForEdit] = useState<VideosRes | undefined>();
  const [type, setType] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  const save = (data: VideosRes) => {
    if (type === 'edit') {
      const index = videos.findIndex((ele) => data.id === ele.id);
      debugger;
      videos.splice(index, 1, data);
      setVideos([...videos]);
      setSearchResult([...videos]);
      setOpen(false);
    } else {
      setOpen(false);
      setVideos([data, ...videos]);
      setSearchResult([data, ...videos]);
    }
  };
  const cancel = () => {
    setOpen(false);
    setVideoForEdit(undefined);
  };

  const authoList: string[] = useMemo(() => {
    const authors = videos.map((ele: VideosRes) => ele.authorName);
    return [...new Set(authors)];
  }, [videos]);

  useEffect(() => {
    getVideos().then((videos) => {
      setVideos(videos);
      setSearchResult(videos);
    });
  }, []);

  const search = useCallback(
    (searchText: string) => {
      setSearchResult(videos.filter(({ authorName }) => authorName.includes(searchText)));
    },
    [videos]
  );

  const edit = (id: number) => {
    setOpen(true);
    setType('edit');
    setVideoForEdit(videos.find((ele) => ele.id === id));
  };

  const remove = (id: number) => {
    const newVideos = videos.filter((ele) => ele.id !== id);
    setVideos(newVideos);
    setSearchResult(newVideos);
  };
  const onAdd = () => {
    setType('add');
    setVideoForEdit(undefined);
    setOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <SearchBox onSearch={search}></SearchBox>
        <VideosTable videos={searchResult} onEdit={edit} onDelete={remove} onAdd={onAdd} />
        <Drawer anchor={'right'} open={open} onClose={cancel}>
          {<VideoForm type={type} open={open} onCancel={cancel} onSave={save} video={videoForEdit} authoList={authoList} />}
        </Drawer>
      </Container>
    </>
  );
};

export default App;
