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

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    firstName: "", 
    lastName: "", 
    email: "",
    password: "",
    repeatPassword: "",
    birth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.repeatPassword) {
      setPasswordsMatch(false);
      return;
    }

    authService
      .signup(signupData)
      .then(({ data }) => navigate("/login"))
      .catch((err) => console.log(err));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const { email, password, repeatPassword, firstName, lastName, birth } =
    signupData;

  const passwordsDoNotMatch =
    repeatPassword !== "" && password !== repeatPassword;

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      direction="column"
      bg="#f7fafc"
    >
      <Box textAlign="center" padding="10px">
        <Text
          as="b"
          fontSize="30px"
          paddingBottom="20px"
          className="login-header"
        >
         ¡Hola!
        </Text>
        <Text fontSize="24px" maxWidth="340px" className="login-text">
          Regístrate para acceder a miles de películas! 📽️🍿
        </Text>
      </Box>
      <Box bg="white" p="8" borderRadius="lg" width="300px">
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Apellidos</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
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

          <FormControl mb="4">
            <FormLabel>Repeat Password</FormLabel>
            <InputGroup>
              <Input
                type={showRepeatPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={handleInputChange}
                name="repeatPassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="sm"
                  onClick={handleToggleRepeatPassword}
                  backgroundColor="transparent"
                  left="10px"
                >
                  {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input
              type="date"
              value={birth}
              onChange={handleInputChange}
              name="birth"
            />
          </FormControl>

          {passwordsDoNotMatch && (
            <Text color="red" mt={2}>
              Las contraseñas no coinciden
            </Text>
          )}

          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            disabled={!passwordsMatch || passwordsDoNotMatch}
          >
            Sign up
          </Button>
        </form>

        <Text align="center" mt="4">
          ¿Ya tienes una cuenta? Pues...{" "}
          <Link to="/login" color="blue.500">
            Inicia sesión
          </Link>{" "}
          🚀✨
        </Text>
      </Box>
    </Flex>
  );
};

export default SignupPage;
