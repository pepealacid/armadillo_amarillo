import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
      <AuthContextWrapper>
          <Router>
            <App />
          </Router>
      </AuthContextWrapper>
    </ChakraProvider>
);
