"use client"

import { useState } from "react"
import TextField from "@mui/material/TextField"
import "./Searchbar.css"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"

function Searchbar() {
  const [value, setValue] = useState("")

  const inputHandler = (e) => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    // Criar a função de busca aqui
    console.log("Searching for:", value)
  }

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          value={value}
          placeholder="Pesquisar produtos..."
          size="small"
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div className="search-icon-wrapper" onClick={handleSearch}>
                  <SearchIcon className="search-icon" />
                </div>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  )
}

export default Searchbar

