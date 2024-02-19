"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";

const defaultImage =
  "https://www.dinamikegitim.com/tema/genel/uploads/haberler/kitaplar-696x435.jpg";

const PaymentPage = ({ onNextStep }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);

  const onSubmitStep1 = (data) => {
    setStep(2);
  };

  const onSubmitStep2 = (data) => {
    const isStep2Valid = validateStep2(data);
    if (isStep2Valid) {
      setStep(3);
    }
  };

  const validateStep2 = (data) => {
    if (
      !data.type ||
      !data.fullName ||
      !data.country ||
      !data.city ||
      !data.address ||
      !data.postalCode ||
      !data.phoneNumber
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return false;
    }
    return true;
  };

  const onSubmitStep3 = (data) => {
    
    window.alert('Siparişiniz başarıyla oluşturuldu!');
  
    
    window.location.href = '/pages/home'; 
  };
  
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(
          step === 1
            ? onSubmitStep1
            : step === 2
            ? onSubmitStep2
            : onSubmitStep3
        )}
      >
        {step === 1 && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ backgroundColor: green[500], color: "white" }}
                type="submit"
              >
                Üye Olmadan Devam Et
              </Button>
            </Grid>
          </Grid>
        )}
        {step === 2 && (
          <Grid
          padding={20}
          display='flex'
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="medium"
                onClick={handlePreviousStep}
                sx={{
                  "&.MuiButton-contained": {
                    backgroundColor: "#9BCF53",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "orange",
                    },
                  },
                }}
              >
                Geri
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: orange[500] }}>
                Adım 2: Adres Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-label">Fatura Türü</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} labelId="type-label" label="Fatura Türü">
                      <MenuItem value="individual">Bireysel</MenuItem>
                      <MenuItem value="corporate">Kurumsal</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ad Soyad"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ülke"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="İl/İlçe"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Adres"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Posta Kodu"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefon Numarası"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
            
                style={{ backgroundColor: green[500], color: "white" }}
                type="submit"
              >
                İleri
              </Button>
            </Grid>
          </Grid>
        )}
       {step === 3 && (
  <Grid container justifyContent="center" alignItems="center" spacing={2}>
    <Grid item xs={12}>
      <Button
        variant="contained"
        size="medium"
        onClick={handlePreviousStep}
        sx={{
          "&.MuiButton-contained": {
            backgroundColor: "#9BCF53",
            color: "white",
            "&:hover": {
              backgroundColor: "orange",
            },
          },
        }}
      >
        Geri
      </Button>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ color: orange[500] }}>
        Adım 3: Ödeme Bilgileri
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Kredi Kartı Bilgileri" />
        <CardContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
  <TextField
    label="Kart Numarası"
    variant="outlined"
    fullWidth
    inputProps={{ maxLength: 16 }} 
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    label="Son Kullanma Tarihi"
    variant="outlined"
    fullWidth
    inputProps={{ maxLength: 5 }} 
    placeholder="MM/YY"
    onChange={(e) => {
      const value = e.target.value;
      if (value.length === 2 && !value.includes("/")) {
        e.target.value = value + "/";
      }
    }}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    label="CVV"
    variant="outlined"
    fullWidth
    inputProps={{ maxLength: 3 }} 
  />
</Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            style={{ backgroundColor: green[500], color: "white" }}
            type="submit"
            onClick={onSubmitStep3} 
          >
            Ödemeyi Tamamla
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
)}
      </form>
    </Box>
  );
};

export default PaymentPage;
