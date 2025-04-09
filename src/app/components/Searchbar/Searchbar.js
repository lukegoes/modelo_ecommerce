"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import TextField from "@mui/material/TextField"
import "./Searchbar.css"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import Image from "next/image"
import Link from "next/link"

// Produtos simulados (em um projeto real, isso viria de uma API)
const allProducts = [
  {
    id: 1,
    name: "Capeletti Queijo",
    brand: "Massa Leve",
    peso: "400g",
    image: "/destaque1.png",
    price: 24.9,
    category: "Massas",
  },
  {
    id: 2,
    name: "Batata Palito",
    brand: "Seara",
    peso: "2Kg",
    image: "/destaque2.png",
    price: 32.5,
    category: "Congelados",
  },
  {
    id: 3,
    name: "Presunto Cozido",
    brand: "Sadia",
    peso: "3,5Kg",
    image: "/destaque3.png",
    price: 48.9,
    category: "Frios",
  },
  {
    id: 4,
    name: "Bacon em cubos",
    brand: "Frimesa",
    peso: "1Kg",
    image: "/destaque4.png",
    price: 29.9,
    category: "Frios",
  },
  {
    id: 5,
    name: "Chicken Supreme",
    brand: "Seara",
    peso: "2Kg",
    image: "/destaque5.png",
    price: 42.9,
    category: "Congelados",
  },
  {
    id: 6,
    name: "Queijo Mussarela",
    brand: "Polenghi",
    peso: "3,5Kg",
    image: "/novidade1.png",
    price: 39.99,
    category: "Laticínios",
  },
  {
    id: 7,
    name: "Queijo Prato",
    brand: "Polenghi",
    peso: "3,5Kg",
    image: "/novidade2.png",
    price: 39.99,
    category: "Laticínios",
  },
  {
    id: 8,
    name: "Atum Ralado",
    brand: "Gomes da Costa",
    peso: "170g",
    image: "/novidade3.png",
    price: 6.49,
    category: "Enlatados",
  },
  {
    id: 9,
    name: "Patê de atum",
    brand: "Gomes da Costa",
    peso: "170g",
    image: "/novidade4.png",
    price: 15.9,
    category: "Enlatados",
  },
  {
    id: 10,
    name: "Salame Italiano",
    brand: "Seara",
    peso: "700g",
    image: "/novidade5.png",
    price: 78.9,
    category: "Frios",
  },
]

function Searchbar() {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const searchRef = useRef(null)

  useEffect(() => {
    // Filtrar produtos com base no texto digitado
    if (value.trim().length > 1) {
      const filteredProducts = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.brand.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 5) // Limitar a 5 sugestões

      setSuggestions(filteredProducts)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [value])

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const inputHandler = (e) => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    if (value.trim()) {
      setShowSuggestions(false)
      router.push(`/busca?q=${encodeURIComponent(value.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    } else if (e.key === "ArrowDown" && showSuggestions && suggestions.length > 0) {
      // Focar no primeiro item da lista
      document.getElementById("suggestion-0")?.focus()
    }
  }

  const handleSuggestionKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = index < suggestions.length - 1 ? index + 1 : 0
      document.getElementById(`suggestion-${nextIndex}`)?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (index === 0) {
        // Voltar para o input
        document.getElementById("search-input")?.focus()
      } else {
        const prevIndex = index - 1
        document.getElementById(`suggestion-${prevIndex}`)?.focus()
      }
    } else if (e.key === "Enter") {
      e.preventDefault()
      router.push(`/produto/${suggestions[index].id}`)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      document.getElementById("search-input")?.focus()
    }
  }

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false)
    router.push(`/produto/${productId}`)
  }

  const highlightMatch = (text) => {
    if (!value) return text

    const regex = new RegExp(`(${value})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="main" ref={searchRef}>
      <div className="search">
        <TextField
          id="search-input"
          onChange={inputHandler}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim().length > 1 && setShowSuggestions(true)}
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

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <ul className="suggestions-list">
              {suggestions.map((product, index) => (
                <li
                  key={product.id}
                  className="suggestion-item"
                  id={`suggestion-${index}`}
                  tabIndex={0}
                  onClick={() => handleSuggestionClick(product.id)}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                >
                  <div className="suggestion-image">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="suggestion-content">
                    <div className="suggestion-name">{highlightMatch(product.name)}</div>
                    <div className="suggestion-info">
                      {product.brand} • {product.category}
                    </div>
                    <div className="suggestion-price">
                      {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                  </div>
                </li>
              ))}
              <li className="suggestion-footer">
                <Link
                  href={`/busca?q=${encodeURIComponent(value.trim())}`}
                  className="view-all-link"
                  onClick={() => setShowSuggestions(false)}
                >
                  Ver todos os resultados
                  <SearchIcon fontSize="small" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Searchbar

