import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import { Typography } from "@mui/material"
import Image from "next/image"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from '@mui/icons-material/Pix';
import ReceiptIcon from '@mui/icons-material/Receipt';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "var(--primary)",
  color: "var(--text-light)",
  padding: theme.spacing(4, 0, 2, 0),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg, var(--accent), var(--secondary))",
  },
}))

const FooterContent = styled(Box)(({
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 16px",
}))

const FooterTitle = styled(Typography)(({
  fontWeight: "bold",
  marginBottom: 15,
  fontSize: "1rem",
  position: "relative",
  paddingBottom: 8,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 2,
    backgroundColor: "var(--accent)",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: 50,
  },
}))

const ContactItem = styled(Box)(({
  display: "flex",
  alignItems: "center", 
  marginBottom: 12,
  textAlign: "left",
  "& svg": {
    marginRight: 10,
    marginTop: 4,
    color: "var(--accent)",
    transition: "transform 0.3s ease",
  },
  "&:hover svg": {
    transform: "scale(1.2)",
  },
}))


const PaymentMethodsContainer = styled(Box)(({
  display: "flex",
  gap: 16,
  justifyContent: "left",
  marginTop: 20,
}))

const PaymentMethod = styled(Box)(({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: 8,
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-3px)",
  },
  "& svg": {
    color: "var(--accent)",
    marginRight: 6,
  },
}))

const Copyright = styled(Typography)(({
  textAlign: "center",
  color: "var(--text-muted)",
  marginTop: 30,
  fontSize: "0.875rem",
  padding: "10px 0",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
}))

const LogoContainer = styled(Box)(({
  marginBottom: 20,
  transition: "transform 0.3s ease",
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
}))

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Grid container spacing={30}>
          <Grid size= {{xs:12, sm:6}}>
            <LogoContainer>
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </LogoContainer>
            <Typography variant="body1" sx={{ color: "var(--text-muted)", mb: 3 }}>
              Há mais de 25 anos servindo os clientes com profissionalismo e credibilidade.
            </Typography>

            <PaymentMethodsContainer>
              <PaymentMethod>
                <CreditCardIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ color: "#fff" }}>Visa</Typography>
              </PaymentMethod>
              <PaymentMethod>
                <CreditCardIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ color: "#fff" }}>Mastercard</Typography>
              </PaymentMethod>
              <PaymentMethod>
                <ReceiptIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ color: "#fff" }}>Boleto</Typography>
              </PaymentMethod>
              <PaymentMethod>
                <PixIcon fontSize="small" />
                <Typography variant="subtitle1" sx={{ color: "#fff" }}>Pix</Typography>
              </PaymentMethod>
            </PaymentMethodsContainer>
          </Grid>

          <Grid size={{ xs:12, sm:6}}>
            <FooterTitle variant="h6">Contato</FooterTitle>
            <ContactItem>
              <LocationOnIcon fontSize="medium" />
              <Typography variant="body1" sx={{ color: "var(--text-muted)" }}>
                Rua dos números, 123
                <br />
                Lugar Nenhum, 12345-678
              </Typography>
            </ContactItem>
            <ContactItem>
              <PhoneIcon fontSize="medium" />
              <Typography variant="body1" sx={{ color: "var(--text-muted)" }}>
                (00) 1234-5678
              </Typography>
            </ContactItem>
            <ContactItem>
              <WhatsAppIcon fontSize="medium" />
              <Typography variant="body1" sx={{ color: "var(--text-muted)" }}>
                (00) 12345-6789
              </Typography>
            </ContactItem>
            <ContactItem>
              <EmailIcon fontSize="medium" />
              <Typography variant="body1" sx={{ color: "var(--text-muted)" }}>
                contato@contato.com.br
              </Typography>
            </ContactItem>
          </Grid>
        </Grid>

        <Copyright>© {new Date().getFullYear()} Desenvolvido por Lucas Goes Lima. Todos os direitos reservados.</Copyright>
      </FooterContent>
    </FooterContainer>
  )
}
