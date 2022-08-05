import { Button, Container, InputBase } from "@mui/material"
import { useState } from "react";

interface SearchBoxProps{
    onSearch: (arg0: string) => void;
}

export const SearchBox = ({onSearch} : SearchBoxProps) => {
  const [searchText, setSearchText] = useState<string>('');

    return <Container style={{ marginTop: '10px' }}>
    <InputBase
    sx={{ ml: 1, flex: 1, mr: 1, width: '250px', border: 'solid 1px', p: 0.2}}
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Search By Author Name"
    inputProps={{ 'aria-label': 'Search By Author Name' }}
  />
  <Button variant="contained" onClick={() => onSearch(searchText)}>Search</Button>
  </Container>
}