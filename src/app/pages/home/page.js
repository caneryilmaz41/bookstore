"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axiosInstance";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import Link from "next/link"; 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://www.googleapis.com/books/v1/volumes?q=%27%27&key=AIzaSyDZTvhLcqVhDaMvxbZ0Lx_XQsjTGfrpxow"
        );

        setBooks(response.data.items || []);
      } catch (error) {
        console.error("Bir hata oluştu:", error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <Container>
      <Grid sx={{paddingTop:5}} container spacing={3}>
        {books.map((book) => (
          <Grid  item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{height: "100%", display: "flex", flexDirection: "column" ,boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',borderRadius:'8px'}}>
              <CardMedia
                component="img"
                height="140"
                image={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:null}
                alt={book.volumeInfo.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 
                </Typography>
              </CardContent>
              <CardActions>
                
                <Link href={`books/${book.id}`} passHref>
                  <Button size="small" variant="outlined">
                    Detayına Git
                  </Button>
                </Link>
                <Button size="small" startIcon={<ShoppingCartIcon />}>
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
