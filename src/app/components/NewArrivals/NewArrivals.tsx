"use client"

import type React from "react"

import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import Image from "next/image"
import { Chip, Typography, Alert } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useEffect, useState } from "react"
import { useCart } from "../../providers/cart-provider"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--background-white)",
  fontFamily: '"Poppins", sans-serif',
  padding: theme.spacing(3),
  borderRadius: 16,
  textAlign: "center",
  color: "var(--text-dark)",
  transition: "all 0.3s ease",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 30px rgba(0, 0, 0, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg, var(--secondary), var(--secondary-light))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  },
}))

const ImageWrapper = styled("div")({
  overflow: "hidden",
  borderRadius: 12,
  marginBottom: 16,
  padding: 10,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(245,247,250,1) 100%)",
    pointerEvents: "none",
  },
  "& img": {
    transition: "transform 0.5s ease",
  },
  "&:hover img": {
    transform: "scale(1.1) rotate(2deg)",
  },
})

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontFamily: '"Poppins", sans-serif',
  backgroundColor: "var(--secondary)",
  color: "var(--text-light)",
  borderRadius: 30,
  padding: "10px 20px",
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(231, 76, 60, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#c0392b",
    transform: "translateY(-3px)",
    boxShadow: "0 6px 15px rgba(231, 76, 60, 0.4)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  color: "var(--primary)",
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  position: "relative",
  paddingBottom: theme.spacing(1.5),
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "80px",
    height: "4px",
    backgroundColor: "var(--secondary)",
    borderRadius: "2px",
  },
  "& .MuiSvgIcon-root": {
    color: "var(--secondary)",
    fontSize: "28px",
  },
}))

const ProductName = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.1rem",
  fontFamily: "Poppins",
  color: "var(--primary)",
  marginBottom: 6,
  transition: "color 0.3s ease",
  "&:hover": {
    color: "var(--secondary)",
  },
})

const ProductInfo = styled(Typography)({
  fontSize: "0.9rem",
  color: "#9ea1a5",
  marginBottom: 16,
  fontFamily: "Poppins",
})

const Price = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "var(--secondary)",
  fontFamily: "Poppins",
  marginBottom: 8,
})

const NewChip = styled(Chip)({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "var(--secondary)",
  fontFamily: "Poppins",
  color: "var(--text-light)",
  fontWeight: "bold",
  zIndex: 10,
  boxShadow: "0 4px 8px rgba(231, 76, 60, 0.3)",
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0 rgba(231, 76, 60, 0.4)",
    },
    "70%": {
      boxShadow: "0 0 0 10px rgba(231, 76, 60, 0)",
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(231, 76, 60, 0)",
    },
  },
})

const products = [
  {
    id: 6,
    name: "Queijo Mussarela",
    brand: "Polenghi",
    peso: "3,5Kg",
    image: "/novidade1.png?height=150&width=150",
    price: 39.99,
  },
  {
    id: 7,
    name: "Queijo Prato",
    brand: "Polenghi",
    peso: "3,5Kg",
    image: "/novidade2.png?height=150&width=150",
    price: 39.99,
  },
  {
    id: 8,
    name: "Atum Ralado",
    brand: "Gomes da Costa",
    peso: "170g",
    image: "/novidade3.png?height=150&width=150",
    price: 6.49,
  },
  {
    id: 9,
    name: "Patê de atum",
    brand: "Gomes da Costa",
    peso: "170g",
    image: "/novidade4.png?height=150&width=150",
    price: 15.9,
  },
  {
    id: 10,
    name: "Salame Italiano",
    brand: "Seara",
    peso: "700g",
    image: "/novidade5.png?height=150&width=150",
    price: 78.90,
  },
]

export default function NewArrivalsGrid() {
  const { addItem } = useCart()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [addedProduct, setAddedProduct] = useState("")

  useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => {
        setOpenSnackbar(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [openSnackbar])

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem(product)
    setAddedProduct(product.name)
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "var(--background-white)",
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <SectionTitle variant="h4">
          <AutoAwesomeIcon /> Novidades
        </SectionTitle>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{xs:12, sm:6, md:4, lg:2.4}} component="div" key={product.id}>
              <Item elevation={2}>
                <ImageWrapper>
                  <NewChip label="NOVO" size="small" />
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={150}
                    height={150}
                    style={{ objectFit: "contain" }}
                  />
                </ImageWrapper>
                <ProductName variant="h6">{product.name}</ProductName>
                <ProductInfo variant="subtitle2">
                  {product.brand} • {product.peso}
                </ProductInfo>
                <Price variant="h6">
                  {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Price>
                <StyledButton
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  disableElevation
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar
                </StyledButton>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
        {openSnackbar && (
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              width: "100%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {addedProduct} adicionado ao carrinho!
          </Alert>
        )}
      </Box>
    </Box>
  )
}

