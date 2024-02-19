"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/stores/products-store";
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { actions } from "@/stores/basket-store";

const BookDetail = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    state.products.products.find((item) => item.id === id)
  );

  useEffect(() => {
    if (!book) {
      dispatch(fetchProducts());
    }
  }, [book, dispatch]);
  const defaultImage =
    "https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg";
  const addBasket = () => {
    console.log("gelen book objesi", book.volumeInfo.title);
    dispatch(actions.addToBasket(book));
  };

  return (
    <Container sx={{ mt: 4, mb: 4, paddingTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {book && (
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="400"
                image={
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : defaultImage
                }
                alt={book.volumeInfo.title}
              />
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {book && (
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.volumeInfo.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {book.volumeInfo.authors.join(", ")}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  component="div"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: book.volumeInfo.description,
                    }}
                  />
                </Typography>
                <Box mt={4}>
                  <Paper
                    elevation={10}
                    sx={{
                      borderRadius: "15px",
                      p: 2,
                      bgcolor: "green",
                      color: "white",
                    }}
                  >
                    <Typography variant="h6" align="center">
                      {book.saleInfo &&
                      book.saleInfo.listPrice &&
                      book.saleInfo.listPrice.amount
                        ? `${book.saleInfo.listPrice.amount} ₺`
                        : "Tükendi"}
                    </Typography>
                  </Paper>
                </Box>
                {book.saleInfo &&
                book.saleInfo.listPrice &&
                book.saleInfo.listPrice.amount ? (
                  <Box mt={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        "&.MuiButton-contained": {
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "orange",
                          },
                        },
                      }}
                      onClick={addBasket}
                    >
                      Sepete Ekle
                    </Button>
                  </Box>
                ) : null}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
