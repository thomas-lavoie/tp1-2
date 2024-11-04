import { Grid2, Box, IconButton } from "@mui/material";
import Article from "./Article";
import { useRef, useEffect, useState } from "react";

export default function Articles({ articles, getArticles, offset, setOffset, previousOffsets, setPreviousOffsets }) {
  const containerRef = useRef(null);

  function handleScroll() {
    if (
      Number.isInteger(Math.round(containerRef.current.scrollTop / 667 + 2))
    ) {
      const newOffset = Math.round(containerRef.current.scrollTop / 667 + 2);
      console.log(newOffset);
      setOffset(newOffset);
      if (!previousOffsets.includes(newOffset)) {
        setPreviousOffsets([...previousOffsets, newOffset]);
        getArticles();
      }
    }
  }

  return (
    <Box className="articles-box" sx={{ flexGrow: 1, p: 2 }}>
      <Grid2
        ref={containerRef}
        onScroll={handleScroll}
        className="articles-container"
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {articles.map((article, index) => (
          <Grid2 size={{ xs: 2, sm: 4, md: 4 }} className="article" key={index}>
            <Article article={article} getArticles={getArticles} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
