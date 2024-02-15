
"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axiosInstance";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Fullscreen } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const BookDetail = ({ params }) => {
  const { id } = params;
  const [book, setBook] = useState(null);

  
  
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Bir hata oluştu:", error);
      }
    };

    if (id) {
      fetchBookDetail();
    }
  }, [id]);

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
            <Typography variant="body2" color="text.secondary">
              <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></div>
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ShoppingCartIcon />}
                sx={{ color: 'black', bgcolor: '#ffffff' }}
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
