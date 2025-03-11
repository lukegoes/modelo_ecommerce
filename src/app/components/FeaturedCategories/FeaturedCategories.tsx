import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Image from "next/image"
import { Typography, Button } from "@mui/material"
import CategoryIcon from "@mui/icons-material/Category"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const CategoryCard = styled(Paper)({
  position: "relative",
  height: 220,
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.3s ease",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
  },
})

const CategoryImage = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  "& img": {
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  "&:hover img": {
    transform: "scale(1.1)",
  },
})

const CategoryOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(to top, rgba(3, 24, 53, 0.9), rgba(3, 24, 53, 0.5) 50%, rgba(3, 24, 53, 0.2))",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: 20,
  transition: "background 0.3s ease",
  "&:hover": {
    background: "linear-gradient(to top, rgba(3, 24, 53, 0.95), rgba(3, 24, 53, 0.6) 50%, rgba(3, 24, 53, 0.3))",
  },
})

const CategoryTitle = styled(Typography)({
  color: "var(--text-light)",
  fontWeight: "bold",
  marginBottom: 12,
  position: "relative",
  paddingBottom: 8,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: "var(--accent)",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: 60,
  },
})

const CategoryButton = styled(Button)({
  backgroundColor: "var(--accent)",
  color: "var(--text-light)",
  alignSelf: "flex-start",
  borderRadius: 30,
  padding: "8px 15px",
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
})

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
    color: "var(--accent)",
    fontSize: "28px",
  },
}))

const categories = [
  { id: 1, name: "Crioulo", image: "/item1.png?height=200&width=300", url: "/placeholder" },
  { id: 2, name: "Polenghi", image: "/item2.png?height=200&width=300", url: "/placeholder" },
  { id: 3, name: "Gomes da Costa", image: "/item3.png?height=200&width=300", url: "/placeholder" },
  { id: 4, name: "Seara", image: "/item4.png?height=200&width=300", url: "/placeholder" },
]

export default function FeaturedCategories() {
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
          <CategoryIcon /> Marcas em Destaque
        </SectionTitle>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid size={{xs:12, sm:6, md:3}} key={category.id}>
              <CategoryCard elevation={3}>
                <CategoryImage>
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill priority />
                </CategoryImage>
                <CategoryOverlay>
                  <CategoryTitle variant="h5">{category.name}</CategoryTitle>
                  <CategoryButton
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    href={category.url}
                    disableElevation
                  >
                    Ver Produtos
                  </CategoryButton>
                </CategoryOverlay>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

