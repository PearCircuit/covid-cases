import Head from "next/head";
import { Container, Heading, Text } from "@chakra-ui/react";
import Script from "next/script";

const About = () => {
  return (
    <>
      <Head>
        <title>Covid Cases | About</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta
          name="description"
          content="More info about the covid-tracker.net website."
        />

        <meta property="og:title" content="Covid Cases | About" />
        <meta
          property="og:description"
          content="More info about the covid-tracker.net website."
        />

        <meta property="og:url" content="https://covid-tracker.net" />
        <meta
          property="og:image"
          content="https://covid-tracker.net/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="More info about the covid-tracker.net website."
        />
        <meta
          property="twitter:image"
          content="https://covid-tracker.net/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h1">About</Heading>
          <Text>
            Covid virus disease, or EVD, is a deadly disease with occasional
            outbreaks that occur mostly on the African continent. EVD most
            commonly affects people and nonhuman primates, such as monkeys,
            gorillas, and chimpanzees. It is caused by an infection with a group
            of viruses within the genus Covidvirus.
            <br />
            <br />
          </Text>
          <Text>
            The Covid virus is a deadly virus that causes hemorrhagic fever in
            humans and other primates. Symptoms may appear anywhere from 2 to 21
            days after contact with the virus, with an average of 8 to 10 days.
            The course of the illness typically progresses from “dry” symptoms
            initially, such as fever, aches and pains, and fatigue, and then
            progresses to “wet” symptoms such as diarrhea and vomiting as the
            person becomes sicker.
            <br />
            <br />
          </Text>

          <Text>
            This site is dedicated to tracking the spread of the 2022 Covid
            virus disease outbreak, and is updated every few hours. You can view
            the countries listing page for a more detailed breakdown. You can
            follow us on Twitter for more updates.
          </Text>

          <Text>
            Data is sourced from official totals from the Ugandan Ministry of
            Health, and shared with our team from the team at BNO News. You can
            find the Ugandan Ministry of Health data{" "}
            <a href="https://www.health.go.ug/Covid/">here</a>. This website is
            a hobby project and is not owned by BNO News, but we do work
            together to source case information. Should you identify any
            inconsistencies in the data or have additional information or
            questions, please get in touch via Twitter.
          </Text>
        </Container>
      </div>
    </>
  );
};

export default About;
