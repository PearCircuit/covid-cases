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
            Coronavirus disease 2019, or COVID-19, is a contagious disease
            caused by a virus, the severe acute respiratory syndrome coronavirus
            2, or SARS-CoV-2. The first known case was identified in Wuhan,
            China, in December 2019. The disease quickly spread worldwide,
            resulting in the COVID-19 pandemic.
            <br /> <br />
          </Text>
          <Text>
            Symptoms of Covid are variable, but often include fever, cough,
            headache, fatigue, breathing difficulties, loss of smell, and loss
            of taste. Symptoms may begin one to fourteen days after exposure to
            the virus. At least a third of people who are infected do not
            develop noticeable symptoms. Of those people who develop symptoms
            noticeable enough to be classed as patients, most develop mild to
            moderate symptoms, up to mild pneumonia, while 14% develop severe
            symptoms, such as dyspnoea, hypoxia, or more than 50% lung
            involvement on imaging. About 5% develop critical symptoms, like
            respiratory failure, shock, or multiorgan dysfunction.
            <br />
            <br />
            Older people are at a higher risk of developing severe symptoms.
            Some people continue to experience a range of effects, called long
            COVID for months after recovery, and damage to organs has been
            observed. Multi-year studies are underway to further investigate the
            long-term effects of the disease.
            <br /> <br />
          </Text>

          <Text>
            This site is dedicated to tracking the spread of the 2022 Covid
            virus, and is updated every few hours. You can view the countries
            listing page for a more detailed breakdown. You can follow us on
            Twitter for more updates. <br />
            <br />
          </Text>

          <Text>
            Data is sourced from Our Wold in Data. This website is a hobby
            project and is not owned by BNO News, but we do work together to
            source case information. Should you identify any inconsistencies in
            the data or have additional information or questions, please get in
            touch via Twitter.
          </Text>
        </Container>
      </div>
    </>
  );
};

export default About;
