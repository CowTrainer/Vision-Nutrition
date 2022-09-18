import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Recipe from './Recipe';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Nutrition Vision
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {

  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState();
  
  const [file, setFile] = useState("https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg");
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    setStatus("fetching data")
    const Getitems = async() => {
      await fetch('/getitems', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {
          setRecipes(data)
          console.log(data)
          setStatus("fetch complete")
        })
      });
    }
    Getitems();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap align = "center">
            NUTRITION TIP OF THE DAY: STAY HYDRATED
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <div>
              <img class = "center" src = "https://i.imgur.com/PJu7Hrh.png"></img>
            </div>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Find your next recipe fast, using a photo of some of your ingredients!
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Container
                align="center">
                  <IconButton color="primary" aria-label="upload picture" component="label" disableRipple = {true}>
                    <div className="input-group">
                        <input hidden type="file" id="image" name="file" 
                        accept="image/*" className="file-custom" onChange={handleChange}/>
                    </div>
                    <Box
                      component="img"
                      sx={{
                        height: 466,
                        width: 700,
                        maxHeight: { xs: 466, md: 334 },
                        maxWidth: { xs: 750, md: 500 },
                      }}
                      alt="Food food food"
                      src={file}
                    />
                  </IconButton>
              </Container>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <p>{status}</p>
                <Button type = "submit" variant="contained">Get recipes!</Button>
              </Stack>
            </form>
          </Container>
        </Box>
        <div className = "recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.name}
            title={recipe.name}
            cooktime="25 min"
            link={recipe.url}
            image={recipe.image}
            ingredients={recipe.ingredients}
          />
        ))}
        </div>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          For Hack The North 2022
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}