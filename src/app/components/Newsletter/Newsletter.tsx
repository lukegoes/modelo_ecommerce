import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { Typography, TextField, Button } from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import SendIcon from "@mui/icons-material/Send"

const NewsletterContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--primary)",
  padding: theme.spacing(6),
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(circle at top right, rgba(52, 152, 219, 0.2), transparent 70%)",
    pointerEvents: "none",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-between",
  },
}))

const TextContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
    marginRight: theme.spacing(4),
    flex: "1 1 60%",
  },
}))

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("md")]: {
    flex: "1 1 40%",
  },
}))

const Title = styled(Typography)({
  color: "var(--text-light)",
  fontWeight: "bold",
  marginBottom: 12,
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: "var(--accent)",
  },
})

const Subtitle = styled(Typography)({
  color: "var(--text-muted)",
  marginTop: 16,
})

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}))

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 30,
    color: "var(--text-light)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.3)",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 20px",
    "&::placeholder": {
      color: "var(--text-muted)",
      opacity: 1,
    },
  },
  "& .MuiInputAdornment-root": {
    marginRight: 8,
  },
})

const SubscribeButton = styled(Button)({
  backgroundColor: "var(--accent)",
  color: "var(--text-light)",
  fontWeight: "bold",
  borderRadius: 25,
  boxShadow: "0 4px 10px rgba(52, 152, 219, 0.3)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "10px",

  "&:hover": {
    backgroundColor: "var(--accent-dark)",
    transform: "scale(1.1)",
    boxShadow: "0 6px 15px rgba(52, 152, 219, 0.4)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
})

export default function Newsletter() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "var(--background-white)",
      }}
    >
      <Box sx={{ maxWidth: 1400, width: "100%" }}>
        <NewsletterContainer elevation={0}>
          <TextContainer>
            <Title variant="h4">Receba nossas ofertas exclusivas</Title>
            <Subtitle variant="body1">
              Inscreva-se em nossa newsletter e receba promoções, novidades e descontos especiais diretamente no seu
              e-mail.
            </Subtitle>
          </TextContainer>

          <FormContainer>
            <InputContainer>
              <StyledTextField
                fullWidth
                placeholder="Seu melhor e-mail"
                variant="outlined"
                InputProps={{
                  startAdornment: <MailOutlineIcon sx={{ color: "var(--accent)" }} />,
                }}
              />
             <SubscribeButton variant="contained" disableElevation>
                <SendIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
              </SubscribeButton>
            </InputContainer>
          </FormContainer>
        </NewsletterContainer>
      </Box>
    </Box>
  )
}

