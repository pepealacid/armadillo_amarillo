import {
    Text,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";
  import { FiEye, FiEyeOff } from "react-icons/fi";
  import authService from "../services/auth.service";
  import { AuthContext } from "../context/auth.context";
  import { useContext, useEffect, useState } from "react";
  
  const LoginPage = () => {
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });
  
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const navigate = useNavigate();
  
    const { authenticate, storeToken } = useContext(AuthContext);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        navigate("/home/artworks");
      }
    }, [navigate]);
  
    const handleInputChange = (e) => {
      const { value, name } = e.target;
      setLoginData({ ...loginData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      authService
        .login(loginData)
        .then(({ data }) => {
          console.log(data);
          storeToken(data.authToken);
          authenticate();
          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setErrorMessage("Incorrect email or password");
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
          console.log(err);
        });
    };
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    const { password, email } = loginData;
  
    return (
      <Flex
        align="center"
        justify="center"
        minH="100vh"
        direction="column"
        bg="#f7fafc"
      >
        <Box textAlign="center" padding="10px">
          <Text as="b" fontSize="30px" paddingBottom="20px" className="login-header">
            ¡Hola Armadillo!
          </Text>
          <Text fontSize="24px" maxWidth="340px" className="login-text">
            Inicia sesión para descubrir miles de películas 📽️🍿
          </Text>
        </Box>
        <Box bg="white" p="8" borderRadius="lg" width="300px">
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleInputChange} name="email" />
            </FormControl>
  
            <FormControl mb="4">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleInputChange}
                  name="password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    onClick={handleTogglePassword}
                    backgroundColor="transparent"
                    left="10px"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
  
            {errorMessage && (
              <Box color="red" textAlign="center" mb="4">
                {errorMessage}
              </Box>
            )}
  
            <Button
              colorScheme="blue"
              width="full"
              type="submit"
            >
              Log in
            </Button>
          </form>
  
          <Text align="center" mt="4">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" color="blue.500">
              Regístrate
            </Link>{" "}
            🚀✨
          </Text>
        </Box>
      </Flex>
    );
  };
  
  export default LoginPage;
  