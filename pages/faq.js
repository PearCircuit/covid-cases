import Head from "next/head";
import {
  Container,
  Heading,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import { colors } from "../styles/colors.js";

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Covid Cases | FAQ</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta
          name="description"
          content="Frquently asked questions about Covid as a disease, including symptom information, treatment information, vaccination information, and statistics."
        />

        <meta property="og:title" content="Covid Tracker | FAQ" />
        <meta
          property="og:description"
          content="Frquently asked questions about covid as a disease, including symptom information, treatment information, vaccination information, and statistics."
        />

        <meta property="og:url" content="https://covid-tracker.com/" />
        <meta
          property="og:image"
          content="https://covid-tracker.com/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="Frquently asked questions about covid virus, including symptom information, treatment information, vaccination information, and statistics."
        />
        <meta
          property="twitter:image"
          content="https://covid-tracker.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h2">Frequently Asked Questions</Heading>
          <Text>Want to learn more about Covid?</Text>
          <Accordion allowToggle allowMultiple mt={10} mb={10}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>This page is under construction</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>Check back soon!</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </div>
    </>
  );
}
