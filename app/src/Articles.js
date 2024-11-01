import { Grid2, Box } from "@mui/material";
import Article from "./Article";

export default function Articles({ articles }) {
  return (
    <Box className="articles-box" sx={{ flexGrow: 1, p: 2 }}>
      <Grid2
        className="articles-container"
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {articles.map((article, index) => (
          <Grid2
            size={{ xs: 2, sm: 4, md: 4 }}
            className="article"
            key={index}
          >
            <Article article={article} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
