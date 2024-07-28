import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PermanentDrawerLeft from "../components/Sidebar";

const HomePage: React.FC = () => {
  const [text, setText] = useState<string>("Hello, world!");
  const [rate, setRate] = useState<number>(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const englishVoices = voices.filter((voice) =>
        voice.lang.startsWith("en")
      );

      setVoices(englishVoices);
      if (englishVoices.length > 0) {
        setSelectedVoice(englishVoices[0].name);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    speechSynthesis.speak(utterance);
  };

  const handleRateChange = (event: Event, newValue: number | number[]) => {
    setRate(newValue as number);
  };

  const handleVoiceChange = (event: SelectChangeEvent<string>) => {
    setSelectedVoice(event.target.value as string);
  };

  return (
    <Box>
      <PermanentDrawerLeft />
      <Box
        sx={{
          width: 300,
          margin: "0 auto",
          textAlign: "center",
          mt: 5,
          "& > *": {
            marginBottom: "1.5rem",
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Practice Technical Interview with multiple accents and speeds
        </Typography>
        <TextField
          label="Text to Speak"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Typography gutterBottom>Speed</Typography>
        <Slider
          value={rate}
          min={0.5}
          max={2}
          step={0.1}
          onChange={handleRateChange}
          valueLabelDisplay="auto"
          aria-labelledby="rate-slider"
        />
        <FormControl fullWidth>
          <InputLabel id="voice-select-label">Voice</InputLabel>
          <Select
            label="Voice"
            labelId="voice-select-label"
            value={selectedVoice}
            onChange={handleVoiceChange}
          >
            {voices.map((voice) => (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSpeak}>
          Speak
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
