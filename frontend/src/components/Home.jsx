import {Box,Typography} from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Typography
        variant="h3"
        style={{
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        Welcome to TaskApp
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Manage your tasks efficiently and effectively.
      </Typography>
    </Box>
  );
};
export default Home;
