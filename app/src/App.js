import logo from "./logo.svg";
import "./App.css";
import Articles from "./Articles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => console.log("Go home")}>
              <NewspaperIcon />
            </IconButton>
            <p>Articles</p>
          </Toolbar>
        </AppBar>
        <Articles />
      </main>
    </ThemeProvider>
  );
}

export default App;
