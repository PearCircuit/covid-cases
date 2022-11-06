import { Container, Button } from "@chakra-ui/react";
import TwitterButton from "./social/TwitterButton.js";

const Footer = () => {
  return (
    <Container maxW={"5xl"} mb={5} mt={5} ml={5} mr={5}>
      <TwitterButton />
    </Container>
  );
};

export default Footer;
