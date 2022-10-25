import { Button } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const TwitterButton = () => {
  return (
    <Button colorScheme="twitter" leftIcon={<FaTwitter />} mt={5} ml={5}>
      <a href="https://twitter.com/ebola_cases">Follow on Twitter</a>
    </Button>
  );
};

export default TwitterButton;
