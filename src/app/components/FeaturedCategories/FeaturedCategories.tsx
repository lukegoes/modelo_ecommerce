import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Image from "next/image"
import { Typography } from "@mui/material"
import CategoryIcon from "@mui/icons-material/Category"
import Link from "next/link"

const CategoryCard = styled(Paper)({
  position: "relative",
  height: 220,
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)"}
})

const CategoryImage = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
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
    width: "50px",
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
  { id: 3, name: "Gomes da Costa", image: "/item3.png?height=1200&width=1250", url: "/placeholder" },
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
      <Box sx={{ maxWidth: 1400, width: "100%" }}>
        <SectionTitle variant="h4">
          <CategoryIcon /> Ofertas em Destaque
        </SectionTitle>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid size={{xs:12, sm:6, md:3}} key={category.id}>
               <Link href={category.url} passHref>
              <CategoryCard elevation={3}>
                <CategoryImage>
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill priority style={{ objectFit: "cover" }} />
                </CategoryImage>
              </CategoryCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

