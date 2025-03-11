"use client"

import { Box, Typography, Button, Container } from "@mui/material"
import Link from "next/link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function PlaceholderPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: "var(--primary)", fontFamily:"Poppins", fontWeight: 700 }}>
        Página em Desenvolvimento
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "var(--primary)", fontFamily:"Poppins" }}>
        Esta seção está sendo desenvolvida e estará disponível em breve.
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "var(--accent)", fontFamily:"Poppins",
            "&:hover": {
              backgroundColor: "rgba(52, 152, 219, 0.05)",
            },
          }}
        >
          Voltar para a Página Inicial
        </Button>
      </Box>
    </Container>
  )
}

