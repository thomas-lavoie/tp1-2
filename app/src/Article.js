import { Card, Chip } from "@mui/material";

export default function Article({ article }) {
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

  function formatTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <Card>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={article.Category}
            sx={{ mr: 1, backgroundColor: chipColor, color: chipColor >= "#f4f4f4" ? "#000" : "#fff", fontWeight: 900 }}
          />
          <p>{formatTimestamp(article.Date)}</p>
        </div>
        <h3>{article.Title}</h3>
      </div>

      <img src={article.Image} height={"50%"} width={"100%"} />

      <p style={{ marginLeft: 20, marginRight: 20 }} className="article-text">
        {article.Text}
      </p>
    </Card>
  );
}
