import "./App.css";
import Articles from "./Articles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Avatar,
  AppBar,
  IconButton,
  Toolbar,
  Modal,
  Paper,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useRef } from "react";
import { validExtension } from "./utils.js";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [createModalStatus, setCreateModalStatus] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [postText, setPostText] = useState("");
  const [textError, setTextError] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(postImage);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const [offset, setOffset] = useState(0);
  const [previousOffsets, setPreviousOffsets] = useState([0, 1, 2]);
  const initialMount = useRef(true);

  useEffect(() => {
    getCatergories();
    if (initialMount.current) {
      initialMount.current = false;
      getArticles(true);
    }
  }, []);

  async function getCatergories() {
    let url =
      "http://localhost:5000/api/articles?sort=Category&fields=Category";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      let categories = [];
      for (const category of data) {
        categories.push(category.Category);
      }
      setCategories(categories);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getArticles(init = false) {
    let url = `http://localhost:5000/api/articles?sort=Date,desc&limit=3&offset=${offset}`;
    if (init) {
      url = `http://localhost:5000/api/articles?sort=Date,desc&limit=6&offset=0`;
      setPreviousOffsets([0, 1, 2]);
    }
    if (searchTerms !== "") {
      url = `${url}&keywords=${searchTerms}`;
    }
    if (category !== "" && category !== null) {
      url = `${url}&Category=${category}`;
    }
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      const newArticles = [...articles, ...data];
      if (init) {
        setArticles(data);
      } else {
        setArticles(newArticles);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!validExtension(ext)) {
        setImageError("Wrong file format");
      } else {
        setImageError("");
        let fReader = new FileReader();
        fReader.readAsDataURL(file);
        fReader.onloadend = () => {
          setAvatarPreview(fReader.result);
          setPostImage(fReader.result);
        };
      }
    }
  };

  const resetErrors = () => {
    setTitleError("");
    setTextError("");
    setCategoryError("");
    setImageError("");
  };

  const resetPostForm = () => {
    setPostTitle("");
    setPostText("");
    setPostCategory("");
    setPostImage(null);
    setAvatarPreview(null);
    resetErrors();
  };

  const handleCreateModalOpen = () => {
    setCreateModalStatus(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalStatus(false);
    resetPostForm();
  };

  async function postArticle() {
    try {
      if (postTitle === "") {
        setTitleError("Title is required");
        throw new Error("Title is required");
      } else {
        setTitleError("");
      }

      if (postText === "") {
        setTextError("Text is required");
        throw new Error("Text is required");
      } else {
        setTextError("");
      }

      if (postCategory === "") {
        setCategoryError("Category is required");
        throw new Error("Category is required");
      } else {
        setCategoryError("");
      }

      if (postImage === null || imageError !== "") {
        setImageError("Image is required");
        throw new Error("Image is required");
      } else {
        setImageError("");
      }

      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: postTitle,
          Text: postText,
          Category: postCategory,
          Image: postImage,
          Date: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      getCatergories();
      getArticles(true);
      handleCreateModalClose();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <div className="content">
          <AppBar position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => console.log("Go home")}>
                  <NewspaperIcon />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={categories}
                    value={category}
                    onChange={(e, value) => setCategory(value)}
                    sx={{ mr: 1, width: 175 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Catégorie"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <TextField
                  label="Recherche"
                  size="small"
                  sx={{ mr: 1 }}
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
                <IconButton onClick={() => getArticles(true)}>
                  <SearchIcon />
                </IconButton>
              </div>
              <IconButton onClick={handleCreateModalOpen}>
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Articles
            articles={articles}
            getArticles={getArticles}
            offset={offset}
            setOffset={setOffset}
            previousOffsets={previousOffsets}
            setPreviousOffsets={setPreviousOffsets}
          />
        </div>
        <Modal
          open={createModalStatus}
          onClose={handleCreateModalClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{ px: 10, py: 5, display: "flex", flexDirection: "column" }}
          >
            <h2>Nouvel article</h2>
            <TextField
              required
              error={titleError !== ""}
              helperText={titleError}
              variant="outlined"
              label="Titre"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              error={textError !== ""}
              helperText={textError}
              variant="outlined"
              label="Texte"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              sx={{ mb: 2 }}
              multiline
              maxRows={4}
            />
            <TextField
              required
              error={categoryError !== ""}
              helperText={categoryError}
              variant="outlined"
              label="Catégorie"
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              sx={{ mb: 2 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                <Avatar
                  src={avatarPreview}
                  sx={{
                    color: "white",
                    marginBottom: 1,
                    height: 100,
                    width: 100,
                    border: imageError !== "" ? "solid" : "",
                    borderColor: "red",
                  }}
                >
                  {!postImage && <span>Image</span>}
                </Avatar>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p
              style={{
                marginTop: 0,
                marginBottom: 10,
                textAlign: "center",
                color: "red",
              }}
            >
              {imageError}
            </p>
            <Button onClick={postArticle}>Créer</Button>
          </Paper>
        </Modal>
      </main>
    </ThemeProvider>
  );
}

export default App;
