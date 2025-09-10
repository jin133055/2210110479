// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortenerForm from "./components/UrlShortenerForm";
import UrlList from "./components/UrlList";
import Analytics from "./components/Analytics";
import RedirectHandler from "./components/RedirectHandler";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Router>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UrlShortenerForm />
                <UrlList />
                <Analytics />
              </>
            }
          />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
