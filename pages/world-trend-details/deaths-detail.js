import Head from "next/head";
import dynamic from "next/dynamic.js";
import Chart from "chart.js/auto";
import Link from "next/link";

import { Container, Heading, Text, Button } from "@chakra-ui/react";
import { colors } from "../../styles/colors.js";

import WorldTable_FullHistory from "../components/WorldTable_FullHistory.js";

const WorldTrends_Deaths = dynamic(
  () => import("../components/worldTrends/WorldTrends_Deaths.js"),
  {
    ssr: false,
  }
);

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function DeathsDetailPage() {
  return (
    <>
      <Head>
        <title>Covid Deaths Details</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta name="description" content="" />

        <meta property="og:title" content="Covid Deaths Details" />
        <meta
          property="og:description"
          content="The Covid Deaths Details page provides information on the number of people who have died from Covid. The data is sourced from BNO News and includes information on the country, year, and cause of death."
        />

        <meta property="og:url" content="https://covid-tracker.net/" />
        <meta
          property="og:image"
          content="https://covid-tracker.net/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="The Covid Deaths Details page provides information on the number of people who have died from Covid. The data is sourced from BNO News and includes information on the country, year, and cause of death."
        />
        <meta
          property="twitter:image"
          content="https://covid-tracker.net/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h1">Deaths - Statistics Details</Heading>
          <WorldTrends_Deaths />
          <Text mt={5} mb={5}>
            The reported death figures on a given date do not necessarily show
            the number of new deaths on that day. This is due to delays in
            reporting. The actual number of deaths is likely to be much higher
            than the number of confirmed deaths. This is due to limited testing.
            In a separate post we discuss how models of COVID-19 help us
            estimate the actual number of deaths.
          </Text>
          <Link href="/">
            <Button>Return to the homepage</Button>
          </Link>
          <Heading as="h2" mt={10} mb={5} size="md">
            Full 2022 case data
          </Heading>
          <WorldTable_FullHistory />
        </Container>
      </div>
    </>
  );
}
