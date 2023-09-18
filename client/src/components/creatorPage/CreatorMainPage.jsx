import {
  IconButton,
  Input,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const CreatorMainPage = () => {
  return (
    <Stack
      elevation={3}
      p={2}
      alignItems="center"
      direction={{ md: "row" }}
      justifyContent="space-between"
    >
      <Paper
        variant="outlined"
        component="form"
        onSubmit={() => {
          console.log("Hello Menu");
        }}
      >
        <Select sx={{ height: "60px", width: "100px" }}>
          <MenuItem onClick={() => console.log("option 1")}>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
          <MenuItem>Option 4</MenuItem>
        </Select>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>

      <Paper
        sx={{ pl: 2 }}
        variant="outlined"
        component="form"
        onSubmit={() => {}}
      >
        <Input
          className="search-bar"
          placeholder="Search"
          value=""
          disableUnderline
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default CreatorMainPage;
