import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { green, red } from "@mui/material/colors";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ModernShoppingCart = ({
  isOpen,
  toggleDrawer,
  basket,
  removeFromBasket,
  addBasket,
}) => {
  const defaultImage =
    "https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg";

  const handlePayment = () => {
    alert("Ödeme işlemine geçiliyor...");
  };
  const calculateTotalAmount = () => {
    let total = 0;
    basket.forEach((item) => {
      total += item.saleInfo.listPrice.amount * item.quantity;
    });
    return total;
  };

  const calculateShippingCost = () => {
    return 60; // Sabit kargo ücreti
  };

  const totalAmount = calculateTotalAmount();
  const shippingCost = calculateShippingCost();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer}
      sx={{ width: 300 }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton color="inherit" onClick={toggleDrawer} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 2, color: "red", fontWeight: "bold" }}
        >
          <ShoppingCartIcon sx={{ fontSize: 50, mr: 1, color: "red" }} />
          Sepetim
        </Typography>

        <List>
          {basket.map((item, index) => (
            <ListItem
              key={`${item.id}-${index}`}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
                marginBottom: 2,
                backgroundColor: "white",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <img
                    src={
                      item.volumeInfo.imageLinks
                        ? item.volumeInfo.imageLinks.thumbnail
                        : defaultImage
                    }
                    alt={item.volumeInfo.title}
                    style={{ width: "100px", height: "100px", borderRadius: 4 }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        {item.volumeInfo.title}
                      </Typography>
                    }
                    secondary={
                      <Grid item xs={2} sm={3}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            onClick={() => removeFromBasket(item)}
                            variant="contained"
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: 1,
                              marginRight: 1,
                              borderRadius: 4,
                              backgroundColor: red[500],
                              color: "orange",
                              minWidth: "unset",
                            }}
                          >
                            -
                          </Button>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color: "green",
                              marginTop: 1,
                              fontSize: "15px",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <Button
                            onClick={() => addBasket(item)}
                            variant="contained"
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: 1,
                              marginLeft: 1,
                              borderRadius: 4,

                              color: "orange",
                              minWidth: "unset",
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </Grid>
                    }
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        {basket.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Sepetiniz boş.
          </Typography>
        )}
        {basket.length > 0 && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Toplam:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Sepetteki Toplam: {totalAmount.toFixed(2)} TL
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Kargo Ücreti: {shippingCost.toFixed(2)} TL
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Genel Toplam: {(totalAmount + shippingCost).toFixed(2)} TL
              </Typography>
              <Link href="/pages/payment" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePayment}
                  sx={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
                    marginTop: 5,
                    "&.MuiButton-contained": {
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "orange",
                      },
                    },
                  }}
                >
                  Ödemeye Geç
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </Box>
    </Drawer>
  );
};

export default ModernShoppingCart;
