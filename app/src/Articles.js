import { Grid2, Box, IconButton } from "@mui/material";
import Article from "./Article";
import AddIcon from "@mui/icons-material/Add";

const article = {
  Title: "test",
  Text: "test",
  Category: "test",
  Image: "test",
  Date: "test",
};

export default function Articles() {
  return (
    <Box sx={{ flexGrow: 1, p: 2, width: "80%", m: "auto" }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size={{ xs: 2, sm: 4, md: 4 }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
        <Grid2 size={{ xs: 2, sm: 4, md: 4 }}>
          <Article article={article} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
