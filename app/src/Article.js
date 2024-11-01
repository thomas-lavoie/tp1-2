import { Card } from "@mui/material";

export default function Article({ article }) {
  return (
    <Card>
      <p>{article.Category}</p>
      <p>{article.Date}</p>
      <p>{article.Title}</p>
      <p>{article.Image}</p>
      <p>{article.Text}</p>
    </Card>
  );
}
