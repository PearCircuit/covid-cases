import Head from "next/head";
import { Container, Heading, Text } from "@chakra-ui/react";
import Script from "next/script";

const About = () => {
  return (
    <>
      <Head>
        <title>Ebola Cases | About</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta
          name="description"
          content="More info about the ebola-cases.com website."
        />

        <meta property="og:title" content="Ebola Cases | About" />
        <meta
          property="og:description"
          content="More info about the ebola-cases.com website."
        />

        <meta property="og:url" content="https://ebola-cases.com" />
        <meta
          property="og:image"
          content="https://ebola-cases.com/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="More info about the ebola-cases.com website."
        />
        <meta
          property="twitter:image"
          content="https://ebola-cases.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h1">About</Heading>
          <Text>
            Ebola virus disease, or EVD, is a deadly disease with occasional
            outbreaks that occur mostly on the African continent. EVD most
            commonly affects people and nonhuman primates, such as monkeys,
            gorillas, and chimpanzees. It is caused by an infection with a group
            of viruses within the genus Ebolavirus.
            <br />
            <br />
          </Text>
          <Text>
            The Ebola virus is a deadly virus that causes hemorrhagic fever in
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
            This site is dedicated to tracking the spread of the 2022 Ebola
            virus disease outbreak, and is updated every few hours. You can view
            the countries listing page for a more detailed breakdown. You can
            also view the states listing page for a breakdown of U.S. cases by
            state. Follow us on twitter for more updates, or follow our partner
            Pandemic News for details about other health crises around the
            world.
          </Text>

          <Text>
            Data is primarily sourced from the US CDC, WHO, and Ugandan Ministry
            of Health. Sources for each case are listed{" "}
            <a href="https://www.health.go.ug/ebola/">here</a>. Should you
            identify any inconsistencies in the data or have additional
            information or questions, please get in touch via Twitter.
          </Text>
        </Container>
      </div>
    </>
  );
};

export default About;
