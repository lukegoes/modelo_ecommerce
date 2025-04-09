"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  type ButtonProps,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../providers/cart-provider"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import PaymentIcon from "@mui/icons-material/Payment"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

const PageTitle = styled(Typography)(({ theme }) => ({
  color: "var(--primary)",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  position: "relative",
  paddingBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
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

const CartItem = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  position: "relative",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(2),
    alignItems: "center",
    textAlign: "center",
  },
}))

const ProductImage = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  position: "relative",
  marginRight: theme.spacing(3),
  transition: "transform 0.3s ease",
  "& img": {
    objectFit: "contain",
  },
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
}))

const ProductInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}))

const ProductName = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  color: "var(--primary)",
  marginBottom: 4,
})

const ProductMeta = styled(Typography)({
  fontFamily: "Poppins",
  color: "#9ea1a5",
  fontSize: "0.875rem",
  marginBottom: 8,
})

const ProductPrice = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  color: "var(--accent-dark)",
})

const QuantityControls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "var(--background-light)",
  borderRadius: 30,
  width: "fit-content",
  padding: "4px",
  border: "1px solid var(--border-color)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
}))

const QuantityButton = styled(IconButton)(({ theme }) => ({
  color: "var(--primary)",
  padding: theme.spacing(0.5),
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "50%",
  minWidth: "30px",
  height: "30px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "var(--accent)",
    color: "var(--text-light)",
  },
}))

const QuantityDisplay = styled('span')({
  display: 'inline-block',
  fontFamily: "Poppins",
  width: '50px',
  textAlign: 'center',
  fontWeight: 600,
  color: '#000',
  padding: '4px 0',
  fontSize: '1rem',
});


const ActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
  },
}))

const PriceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2), 
    marginTop: theme.spacing(2),
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: "var(--text-muted)",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "var(--secondary)",
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
}))

const CartSummary = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  fontFamily: "Poppins",
  borderRadius: 12,
  position: "sticky",
  top: 140,
  backgroundColor: "var(--background-white)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
  },
}))

const SummaryTitle = styled(Typography)({
  fontWeight: 700,
  fontFamily: "Poppins",
  color: "var(--primary)",
  marginBottom: 16,
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
  },
})

const SummaryRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}))

const TotalRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "var(--primary)",
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: "1px solid var(--border-color)",
}))

const CheckoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: "var(--accent)",
  color: "var(--text-light)",
  padding: "12px 16px",
  borderRadius: 50,
  fontWeight: 600,
  transition: "all 0.3s ease",
  width: "100%",
  boxShadow: "0 6px 12px rgba(52, 152, 219, 0.2)",
  "&:hover": {
    backgroundColor: "var(--accent-dark)",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 15px rgba(52, 152, 219, 0.3)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
}))

const ContinueShoppingButton = styled(Button)<ButtonProps & { component?: React.ElementType }>(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: "var(--accent)",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    color: "var(--accent-dark)",
    backgroundColor: "rgba(52, 152, 219, 0.05)",
    transform: "translateX(-5px)",
  },
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(1),
  },
}))

const EmptyCartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 3),
  textAlign: "center",
}))

const EmptyCartIcon = styled(ShoppingCartIcon)({
  fontSize: 80,
  color: "var(--text-muted)",
  marginBottom: 24,
  opacity: 0.4,
})

const ShippingInputContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}))

const ShippingInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  fontFamily: "Poppins",
  alignItems: "center",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(52, 152, 219, 0.1)",
  borderRadius: 8,
  "& .MuiSvgIcon-root": {
    color: "var(--accent)",
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
}))

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cepValue, setCepValue] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  const handleCepSubmit = () => {
    alert(`CEP digitado: ${cepValue}`);
  };

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const shippingCost = items.length > 0 ? 15.9 : 0
  const freeShippingThreshold = 150
  const isFreeShipping = totalPrice >= freeShippingThreshold
  const finalShippingCost = isFreeShipping ? 0 : shippingCost

  

  const handleCheckout = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const confirmOrder = () => {
    clearCart()
    setDialogOpen(false)
    alert("Pedido realizado com sucesso!")
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8)
    }
    if (value.length <= 9) {
      setCepValue(value)
    }
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <EmptyCartContainer>
          <EmptyCartIcon />
          <Typography variant="h5" color="var(--primary)" fontWeight={700} mb={2}>
            Seu carrinho está vazio
          </Typography>
          <Typography variant="body1" color="var(--text-muted)" mb={4}>
            Adicione produtos para começar suas compras!
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "var(--accent)",
              borderRadius: 50,
              fontFamily: "Poppins",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 12px rgba(52, 152, 219, 0.2)",
              "&:hover": {
                backgroundColor: "var(--accent-dark)",
                transform: "translateY(-3px)",
                boxShadow: "0 8px 15px rgba(52, 152, 219, 0.3)",
              },
            }}
          >
            Explorar Produtos
          </Button>
        </EmptyCartContainer>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ContinueShoppingButton component={Link} href="/" startIcon={<ArrowBackIcon />}>
        Continuar Comprando
      </ContinueShoppingButton>

      <PageTitle variant="h4">
        <ShoppingCartIcon /> Meu Carrinho • {totalItems} {totalItems === 1 ? "item" : "itens"}
      </PageTitle>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <CartItem key={item.id} elevation={1}>
              <ProductImage>
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="100px" />
              </ProductImage>

              <ProductInfo>
                <ProductName variant="h6">{item.name}</ProductName>
                <ProductMeta variant="body2">
                  {item.brand} • {item.peso}
                </ProductMeta>
                <ProductPrice variant="subtitle1">
                  {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </ProductPrice>
              </ProductInfo>

              <ActionsContainer>
              <QuantityControls>
                <QuantityButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </QuantityButton>

                <QuantityDisplay>{item.quantity}</QuantityDisplay>

                <QuantityButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= 99} // Limita a 99
                >
                  <AddIcon fontSize="small" />
                </QuantityButton>
              </QuantityControls>

                <PriceContainer>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "var(--accent-dark)" }}>
                    {(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Typography>
                </PriceContainer>

                <DeleteButton onClick={() => removeItem(item.id)} aria-label="Remover item">
                  <DeleteOutlineIcon />
                </DeleteButton>
              </ActionsContainer>
            </CartItem>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary elevation={1}>
            <SummaryTitle variant="h6">Resumo do Pedido</SummaryTitle>

            <SummaryRow>
              <Typography variant="body2" color="var(--text-muted)">
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </SummaryRow>

            <ShippingInputContainer>
              <Typography variant="body2" fontWeight={600} mb={1}>
                Calcular Frete
              </Typography>
              <div className="cep-container">
              <input 
                id="cep-input"
                type="text" 
                autoComplete="off"
                placeholder="Digite seu CEP" 
                value={cepValue} 
                onChange={handleCepChange} 
                className="cep-input"
              />
              <button 
                onClick={handleCepSubmit} 
                className="cep-button"
              >
                OK
              </button>
            </div>


            </ShippingInputContainer>

            {isFreeShipping ? (
              <ShippingInfo>
                <LocalShippingIcon />
                <Typography variant="body2">
                  <b>Você atingiu o valor mínimo <br/> para frete grátis!</b>
                </Typography>
              </ShippingInfo>
            ) : (
              <ShippingInfo>
                <InfoOutlinedIcon />
                <Typography variant="body2">
                  Compre mais R${" "}
                  {(freeShippingThreshold - totalPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} para
                  ganhar <b>Frete grátis</b>
                </Typography>
              </ShippingInfo>
            )}

            <SummaryRow sx={{ mt: 2 }}>
              <Typography variant="body2" color="var(--text-muted)">
                Frete
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {finalShippingCost === 0
                  ? "Grátis"
                  : finalShippingCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </SummaryRow>

            <TotalRow>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1">
                {(totalPrice + finalShippingCost).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </TotalRow>

            <CheckoutButton variant="contained" startIcon={<PaymentIcon />} onClick={handleCheckout}>
              Finalizar Compra
            </CheckoutButton>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="caption" color="var(--text-muted)">
                Pagamentos processados com segurança
              </Typography>
            </Box>
          </CartSummary>
        </Grid>
      </Grid>

      {isMounted && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <DialogTitle sx={{ fontFamily: 'Poppins, sans-serif' }}>Confirmar Pedido</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Esta é uma demonstração. Em um site real, você seria direcionado para uma página de checkout segura para
              concluir seu pedido.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" sx={{fontFamily: 'Poppins, sans-serif'}} >
              Cancelar
            </Button>
            <Button onClick={confirmOrder} variant="contained" sx={{ bgcolor: "var(--accent)", fontFamily: 'Poppins, sans-serif' }}>
              Confirmar Pedido
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  )
}

