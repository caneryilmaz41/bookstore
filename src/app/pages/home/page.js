"use client";

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Grid,
  IconButton,
  Container,
  TextField,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { fetchProducts } from "@/stores/products-store";
import { actions } from "@/stores/basket-store";
import resim from "@/images/kitap.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.products.products);
  const defaultImage =
    "https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg";

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const results = details.filter(
      (book) =>
        book.volumeInfo.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        book.volumeInfo.authors
          .join(", ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, details]);

  const addBasket = (book) => {
    console.log("gelen book objesi", book);
    dispatch(actions.addToBasket(book));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 2,

          "& fieldset": {
            borderColor: "#FF8911 !important",
          },
        }}
      >
        <TextField
          sx={{ width: "70%", marginTop: 4, marginBottom: 4 }}
          label="Kitap Adı veya Yazar Adı Ara"
          variant="outlined"
          onChange={handleSearch}
          InputLabelProps={{
            shrink: true,
            color: "success",
            sx: {
              color: "#FF8911",
            },
          }}
        />
      </Box>
      {loading ? (
        <Box
          sx={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ color: "#FF8911" }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {searchResults.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : defaultImage
                  }
                  style={{ objectFit: "fill", height: "100%" }}
                />
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: 1,
                  }}
                >
                  <Link href={`/pages/books/${book.id}`} passHref>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "none",
                        "&.MuiButton-contained": {
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": { backgroundColor: "orange" },
                        },
                      }}
                    >
                      <VisibilityIcon sx={{ color: "white", marginRight: 1 }} />
                      Kitabı İncele
                    </Button>
                  </Link>
                  {book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => addBasket(book)}
                      sx={{
                        "&.MuiButton-contained": {
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": { backgroundColor: "orange" },
                        },
                      }}
                    >
                      <ShoppingCartIcon sx={{ color: "white" }} />
                    </Button>
                  ) : null}
                </CardActions>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {book.volumeInfo.authors.join(", ")}
                  </Typography>
                </CardContent>

                <Paper
                  elevation={3}
                  sx={{ p: 2, mt: "auto", bgcolor: "green" }}
                >
                  <Typography variant="body1" color="white" align="center">
                    {book.saleInfo &&
                    book.saleInfo.listPrice &&
                    book.saleInfo.listPrice.amount
                      ? `${book.saleInfo.listPrice.amount} ₺`
                      : "Tükendi"}
                  </Typography>
                </Paper>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
