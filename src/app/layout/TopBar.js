"use client"
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/stores/basket-store";
import ModernShoppingCart from "../component/ModernShoppingCart";

export function TopBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  function getTotalItemsCount(basket) {
    return basket.reduce((total, item) => total + item.quantity, 0);
  }

  const addBasket = (book) => {
    console.log("sepete eklenen", book);
    dispatch(actions.addToBasket(book));
  };

  const removeFromBasket = (book) => {
    console.log("sepetten silinen ", book);
    if (book.quantity === 1) {
      dispatch(actions.removeFromBasket(book));
    } else {
      dispatch(actions.decreaseQuantity(book));
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{
          
          color:'white',
              border:'-moz-initial',
              borderColor:'red',
          backgroundColor:'#FF8911',
          
        }}>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KİTAP MERKEZİM
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="sepet"
            onClick={toggleDrawer}
          >
            <Badge  badgeContent={getTotalItemsCount(basket)} color="error">
              <ShoppingCartIcon  />
            </Badge>
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ width: 300 }}
          >
            {/* ModernShoppingCart bileşenini burada kullanın */}
            <ModernShoppingCart
              isOpen={isDrawerOpen}
              toggleDrawer={toggleDrawer}
              basket={basket}
              removeFromBasket={removeFromBasket}
              addBasket={addBasket}
            />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopBar;
