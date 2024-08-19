import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import PermanentDrawerLeft from "../components/Sidebar";
import { loadQuestion } from "../utils/loadJson";
const QuestionPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const filePath = path.replace("/questions", "");

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const importJsonFile = async () => {
      try {
        console.log(filePath);
        const jsonFile = await loadQuestion(filePath);
        setData(jsonFile);
      } catch (err) {
        console.error(err);
        setError("Failed to load the JSON file.");
      }
    };

    importJsonFile();
  }, [filePath]);

  return (
    <Box
      sx={{
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <PermanentDrawerLeft />
      <Typography variant="h5">QuestionPage</Typography>
      <Typography variant="body1">file Path: {filePath}</Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
};

export default QuestionPage;
