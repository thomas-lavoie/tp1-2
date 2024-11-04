import {
  Card,
  Chip,
  IconButton,
  Modal,
  Paper,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { formatTimestamp, validExtension } from "./utils.js";

export default function Article({ article, getArticles }) {
  const [optionsDisplay, setOptionsDisplay] = useState("none");
  const [detailsModalStatus, setDetailsModalStatus] = useState(false);
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  const [putTitle, setPutTitle] = useState(article.Title);
  const [titleError, setTitleError] = useState("");
  const [putText, setPutText] = useState(article.Text);
  const [textError, setTextError] = useState("");
  const [putCategory, setPutCategory] = useState(article.Category);
  const [categoryError, setCategoryError] = useState("");
  const [putImage, setPutImage] = useState(article.Image);
  const [imageError, setImageError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(article.Image);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

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
          setPutImage(fReader.result);
        };
      }
    }
  };

  const urlToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const isBase64 = (str) => {
    return str.startsWith("data:image");
  };

  const resetErrors = () => {
    setTitleError("");
    setTextError("");
    setCategoryError("");
    setImageError("");
  };

  const resetPutForm = () => {
    setPutTitle(article.Title);
    setPutText(article.Text);
    setPutCategory(article.Category);
    setPutImage(article.Image);
    setAvatarPreview(article.Image);
    resetErrors();
  };

  const handleUpdateModalOpen = () => {
    setUpdateModalStatus(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalStatus(false);
    resetPutForm();
  };

  async function deleteArticle() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/articles/${article.Id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: article.Id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      getArticles(true);
      setDeleteModalStatus(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function putArticle() {
    try {
      if (putTitle === "") {
        setTitleError("Title is required");
        throw new Error("Title is required");
      } else {
        setTitleError("");
      }

      if (putText === "") {
        setTextError("Text is required");
        throw new Error("Text is required");
      } else {
        setTextError("");
      }

      if (putCategory === "") {
        setCategoryError("Category is required");
        throw new Error("Category is required");
      } else {
        setCategoryError("");
      }

      if (putImage === null || imageError !== "") {
        setImageError("Image is required");
        throw new Error("Image is required");
      } else {
        setImageError("");
      }

      // Ensure putImage is in base64 format if it's not already
      let imageToSend = putImage;
      if (!isBase64(putImage)) {
        imageToSend = await urlToBase64(putImage);
      }

      const response = await fetch(
        `http://localhost:5000/api/articles/${article.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: article.Id,
            Title: putTitle,
            Text: putText,
            Category: putCategory,
            Image: imageToSend,
            Date: Date.now(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      getArticles(true);
      handleUpdateModalClose();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let chipColor = "";
  switch (article.Category) {
    case "Crime":
      chipColor = "#f00";
      break;
    case "International":
      chipColor = "#08f";
      break;
    case "Éducation":
      chipColor = "#979";
      break;
    case "Environnement":
      chipColor = "#5b5";
      break;
    case "Santé":
      chipColor = "#ffa";
      break;
  }

  return (
    <>
      <Card
        onMouseOver={() => setOptionsDisplay("flex")}
        onMouseLeave={() => setOptionsDisplay("none")}
      >
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <div
            style={{
              height: 50,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={article.Category}
                sx={{
                  mr: 1,
                  backgroundColor: chipColor,
                  color: chipColor >= "#f4f4f4" ? "#000" : "#fff",
                  fontWeight: 900,
                }}
              />{" "}
              <div style={{ display: optionsDisplay, flexWrap: "wrap" }}>
                <IconButton
                  onClick={() => setDetailsModalStatus(true)}
                  sx={{ mr: 1 }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={handleUpdateModalOpen} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => setDeleteModalStatus(true)}
                  sx={{ mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <h3
            onClick={() => setDetailsModalStatus(true)}
            style={{
              height: "3em",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              marginTop: 2,
              cursor: "pointer",
            }}
          >
            {article.Title}
          </h3>
        </div>

        <div
          style={{
            width: "100%",
            paddingBottom: "56.25%",
            position: "relative",
          }}
        >
          <img
            src={article.Image}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>

        <p
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 4,
            color: "grey",
          }}
        >
          {formatTimestamp(article.Date)}
        </p>

        <p
          style={{ marginLeft: 20, marginRight: 20, cursor: "pointer" }}
          className="article-text"
          onClick={() => setDetailsModalStatus(true)}
        >
          {article.Text}
        </p>
      </Card>
      <Modal
        open={detailsModalStatus}
        onClose={() => setDetailsModalStatus(false)}
        sx={{
          margin: "auto",
          width: "100%",
          height: "90%",
          overflow: "scroll",
        }}
      >
        <Paper
          sx={{
            margin: "auto",
            width: "90%",
            maxWidth: 500,
            px: 4,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: 30,
            }}
          >
            <IconButton onClick={() => setDetailsModalStatus(false)}>
              <ClearIcon />
            </IconButton>
          </div>
          <Chip
            label={article.Category}
            sx={{
              width: "fit-content",
              m: "auto",
              mt: -4.5,
              backgroundColor: chipColor,
              color: chipColor >= "#f4f4f4" ? "#000" : "#fff",
              fontWeight: 900,
            }}
          />
          <h2 style={{ textAlign: "center", marginBottom: 0 }}>
            {article.Title}
          </h2>

          <p style={{ textAlign: "center", color: "grey", marginTop: 2 }}>
            {formatTimestamp(article.Date)}
          </p>
          <p>{article.Text}</p>
        </Paper>
      </Modal>
      <Modal
        open={updateModalStatus}
        onClose={handleUpdateModalClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ px: 10, py: 5, display: "flex", flexDirection: "column" }}>
          <h2>Modification d'article</h2>
          <TextField
            required
            error={titleError !== ""}
            helperText={titleError}
            variant="outlined"
            label="Titre"
            value={putTitle}
            onChange={(e) => setPutTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            error={textError !== ""}
            helperText={textError}
            variant="outlined"
            label="Texte"
            value={putText}
            onChange={(e) => setPutText(e.target.value)}
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
            value={putCategory}
            onChange={(e) => setPutCategory(e.target.value)}
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
                {!putImage && <span>Image</span>}
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
          <Button onClick={putArticle}>Modifier</Button>
        </Paper>
      </Modal>
      <Modal
        open={deleteModalStatus}
        onClose={() => setDeleteModalStatus(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ px: 10, py: 5, display: "flex", flexDirection: "column" }}>
          <h2>Confirmer la suppression</h2>
          <Paper elevation={3} sx={{ px: 2, mb: 1 }}>
            <p>{article.Title}</p>
          </Paper>
          <div>
            <Button sx={{ mr: 1 }} onClick={() => setDeleteModalStatus(false)}>
              Annuler
            </Button>
            <Button color="error" onClick={deleteArticle}>
              Supprimer
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
}
