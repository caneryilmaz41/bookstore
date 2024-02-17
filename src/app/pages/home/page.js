"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import Link from "next/link"; 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 
import { fetchProducts } from "@/stores/products-store";

import { actions } from '@/stores/basket-store';
import resim from '@/images/kitap.jpg'

const Home = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.products.products);
  const defaultImage = 'https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg';


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const addBasket = (book) => {
    console.log("gelen book objesi" , book)
    dispatch(actions.addToBasket(book))
  }


  return (
    <Container sx={{backgroundColor:'white',}}>
      <Grid sx={{paddingTop:10,}} container spacing={3}>
        {details.map((book) => (
          <Grid  item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{height: "100%", display: "flex", flexDirection: "column", boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', borderRadius: '8px'}}>
  <CardMedia
    component="img"
    height="200" // Sabit resim yüksekliği
    image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : defaultImage}
  />
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography gutterBottom variant="h5" component="div">
      {book.volumeInfo.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {/* Gerekirse içerik ekleyebilirsiniz */}
    </Typography>
  </CardContent>
  <CardActions>
    <Link href={`books/${book.id}`} passHref>
      <Button size="small" variant="outlined">
        Detayına Git
      </Button>
    </Link>
    <Button size="small" startIcon={<ShoppingCartIcon />} onClick={() => addBasket(book)}>
      Sepete Ekle
    </Button>
  </CardActions>
</Card>

          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

