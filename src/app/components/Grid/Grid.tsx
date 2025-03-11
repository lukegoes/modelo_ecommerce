"use client"

import type React from "react"

import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Button from "@mui/material/Button"
import Image from "next/image"
import { Typography, Alert } from "@mui/material"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
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
    background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
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
  backgroundColor: "var(--accent)",
  color: "var(--text-light)",
  borderRadius: 30,
  padding: "10px 20px",
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(52, 152, 219, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "var(--accent-dark)",
    transform: "translateY(-3px)",
    boxShadow: "0 6px 15px rgba(52, 152, 219, 0.4)",
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
    backgroundColor: "var(--accent)",
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
    color: "var(--accent)",
  },
})

const ProductInfo = styled(Typography)({
  fontSize: "0.9rem",
  fontFamily: "Poppins",
  color: "#9ea1a5",
  marginBottom: 16,
})

const Price = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.2rem",
  fontFamily: "Poppins",
  color: "var(--accent-dark)",
  marginBottom: 8,
})

const products = [
  {
    id: 1,
    name: "Capeletti de Queijo",
    brand: "Massa Leve",
    peso: "400g",
    image: "/destaque1.png?height=150&width=150",
    price: 24.9,
  },
  {
    id: 2,
    name: "Batata Palito",
    brand: "Seara",
    peso: "2Kg",
    image: "/destaque2.png?height=150&width=150",
    price: 32.5,
  },
  {
    id: 3,
    name: "Presunto Cozido",
    brand: "Sadia",
    peso: "3,5Kg",
    image: "/destaque3.png?height=150&width=150",
    price: 48.9,
  },
  {
    id: 4,
    name: "Bacon em cubos",
    brand: "Frimesa",
    peso: "1Kg",
    image: "/destaque4.png?height=150&width=150",
    price: 29.9,
  },
  {
    id: 5,
    name: "Chicken Supreme",
    brand: "Seara",
    peso: "2Kg",
    image: "/destaque5.png?height=150&width=150",
    price: 42.9,
  },
]

export default function BestSellersGrid() {
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
        backgroundColor: "var(--background-light)",
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <SectionTitle variant="h4">
          <LocalFireDepartmentIcon /> Produtos Mais Vendidos
        </SectionTitle>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{xs:12, sm:6, md:4, lg:2.4}} key={product.id}>
              <Item elevation={2}>
                <ImageWrapper>
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

