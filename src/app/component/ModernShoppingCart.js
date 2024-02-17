import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { green, red } from '@mui/material/colors';

const ModernShoppingCart = ({ isOpen, toggleDrawer, basket, removeFromBasket, addBasket }) => {
    const defaultImage = 'https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg';
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer}
      sx={{ width: { xs: '100%', sm: 300 } }}
    >
      <Box sx={{ width: { xs: '100%', sm: 'auto' }, backgroundColor: 'white', padding: 2, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton color="inherit" onClick={toggleDrawer} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Sepetiniz
        </Typography>
        <List>
          {basket.map((item, index) => (
            <ListItem key={`${item.id}-${index}`} sx={{ marginBottom: 2, borderRadius: 4, backgroundColor: '#FF8911' }}>
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <img
                    src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : defaultImage}
                    alt={item.volumeInfo.title}
                    style={{ width: '100px', height: '100px', borderRadius: 4 }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ListItemText sx={{color:'white',fontWeight:'bold'}} primary={item.volumeInfo.title} secondary={ `Adet: ${item.quantity}`} />
                </Grid>
                <Grid item xs={2} sm={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={() => removeFromBasket(item)} variant="contained" size="small" sx={{ borderRadius: 4, backgroundColor: red[500], color: 'white', minWidth: 'unset' }}>-</Button>
                    <Button onClick={() => addBasket(item)} variant="contained" size="small" sx={{ borderRadius: 4, backgroundColor: green[500], color: 'white', minWidth: 'unset' }}>+</Button>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Box sx={{ 
        
            color:'Black',
            display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button sx={{backgroundColor:'red'}}
          variant="contained" 
           
          color="primary" onClick={''}>
            Ödemeye Geç
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ModernShoppingCart;
