"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetails, fetchProducts } from "@/stores/products-store";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { actions } from '@/stores/basket-store'; 

const BookDetail = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch();
  const book = useSelector((state) => state.products.products.find((item) => item.id === id));
 

  useEffect(() => {
    if (!book) {
      dispatch(fetchProducts());
    }
  }, [book, dispatch]);

  const addBasket = () => {
    console.log("gelen book objesi", book.volumeInfo.title);
    dispatch(actions.addToBasket(book));
  };
  const removeFromBasket = () => {
    console.log
    dispatch(basketActions.removeFromBasket(book));
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        display: 'flex',
        backgroundImage: book && book.volumeInfo.imageLinks
          ? `url(${book.volumeInfo.imageLinks.thumbnail})`
          : '', 
        backgroundSize: 'cover  ',
        backgroundPosition: 'center',
      }}
    >
      {book && (
        <Card
          sx={{
            width: '50%',
            boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          }}
        >
          <CardMedia
            component="img"
            image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}
            alt={book.volumeInfo.title}
            sx={{ width: 150, objectFit: 'cover' }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {book.volumeInfo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ShoppingCartIcon />}
                sx={{ color: 'black', bgcolor: '#ffffff' }}
                onClick={addBasket} 
              >
                Sepete Ekle
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default BookDetail;

