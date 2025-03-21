"use client";
import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

const languages: string[] = [
  "Afrikaans",
  "العربية",
  "Čeština",
  "Dansk",
  "Deutsch",
  "Ελληνικά",
  "English",
  "English (UK)",
  "Español (España)",
  "Español",
  "فارسی",
  "Suomi",
  "Français",
  "עברית",
  "Bahasa Indonesia",
  "Italiano",
  "日本語",
  "한국어",
  "Bahasa Melayu",
  "Norsk",
  "Nederlands",
];

const LanguageSelector: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>("English");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedLang(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 150,
        width: "100px",
        height: "30px",
      }}
    >
      <Select
        value={selectedLang}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        sx={{
          bgcolor: "blawhitek",
          color: "white",
          width: "100px",
          height: "30px",
          fontSize: "14px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        {languages.map((lang, index) => (
          <MenuItem
            key={index}
            value={lang}
            sx={{ bgcolor: "white", color: "black" }}
          >
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
