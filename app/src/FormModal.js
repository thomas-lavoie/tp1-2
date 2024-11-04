// import {
//   Avatar,
//   Modal,
//   Paper,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useState } from "react";

// export default function FormModal({ title, setTitle, text, category, image, status, open, close, onSubmit, creating }) {
//   const [titleError, setTitleError] = useState("");
//   const [textError, setTextError] = useState("");
//   const [categoryError, setCategoryError] = useState("");
//   const [imageError, setImageError] = useState("");
//   const [avatarPreview, setAvatarPreview] = useState(postImage);

//   return (
//     <Modal
//       open={status}
//       onClose={close}
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper sx={{ px: 10, py: 5, display: "flex", flexDirection: "column" }}>
//         <h2>Nouvel article</h2>
//         <TextField
//           required
//           error={titleError !== ""}
//           helperText={titleError}
//           variant="outlined"
//           label="Titre"
//           value={title}
//           onChange={(e) => setPostTitle(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           required
//           error={textError !== ""}
//           helperText={textError}
//           variant="outlined"
//           label="Texte"
//           value={postText}
//           onChange={(e) => setPostText(e.target.value)}
//           sx={{ mb: 2 }}
//           multiline
//           maxRows={4}
//         />
//         <TextField
//           required
//           error={categoryError !== ""}
//           helperText={categoryError}
//           variant="outlined"
//           label="Catégorie"
//           value={postCategory}
//           onChange={(e) => setPostCategory(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "center",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <label htmlFor="file-input" style={{ cursor: "pointer" }}>
//             <Avatar
//               src={avatarPreview}
//               sx={{
//                 color: "white",
//                 marginBottom: 1,
//                 height: 100,
//                 width: 100,
//                 border: imageError !== "" ? "solid" : "",
//                 borderColor: "red",
//               }}
//             >
//               {!postImage && <span>Image</span>}
//             </Avatar>
//             <input
//               type="file"
//               id="file-input"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={handleImageChange}
//             />
//           </label>
//         </div>
//         <p
//           style={{
//             marginTop: 0,
//             marginBottom: 10,
//             textAlign: "center",
//             color: "red",
//           }}
//         >
//           {imageError}
//         </p>
//         <Button onClick={postArticle}>Créer</Button>
//       </Paper>
//     </Modal>
//   );
// }
