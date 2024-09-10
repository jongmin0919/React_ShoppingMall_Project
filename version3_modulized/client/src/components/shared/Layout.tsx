import { AppBar, Box, Button, Container, Fab, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

const navigate = useNavigate();
const handlePushHomePage = () => navigate('/');
const handlePushCartPage = () => navigate('/cart');
const handlePushCreatePage = () => navigate('/create');

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 'bold', cursor: 'pointer' }} onClick = {handlePushHomePage}>
              온라인 쇼핑몰
            </Typography>
            <Button color="inherit" onClick={handlePushCartPage}>
              장바구니
            </Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          {children}
        </Container>
      </Box>
      <Box sx={{ position: "fixed", bottom: "16px", right: "16px" }}>
        <Fab color="primary" onClick = {handlePushCreatePage}>
          추가하기
        </Fab>
      </Box>
    </>
  );
}

export default Layout;
