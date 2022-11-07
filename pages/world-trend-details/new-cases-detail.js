import Head from "next/head";
import dynamic from "next/dynamic.js";
import Chart from "chart.js/auto";
import Link from "next/link";

import { Container, Heading, Text, Button } from "@chakra-ui/react";
import { colors } from "../../styles/colors.js";
import WorldTable_FullHistory from "../components/WorldTable_FullHistory.js";

const WorldTrends_NewCases = dynamic(
  () => import("../components/worldTrends/WorldTrends_NewCases.js"),
  {
    ssr: false,
  }
);

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function NewCasesDetailPage() {
  return (
    <>
      <Head>
        <title>Ebola New Cases Details</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta name="description" content="" />

        <meta property="og:title" content="Ebola New Cases Details" />
        <meta
          property="og:description"
          content="The Ebola New Cases Details page provides information on the number of people who have been infected by Ebola. The data is sourced from BNO News and includes information on the country, year, and cause of death."
        />

        <meta property="og:url" content="https://ebola-cases.com/" />
        <meta
          property="og:image"
          content="https://ebola-cases.com/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="The Ebola New Cases Details page provides information on the number of people who have been infected by Ebola. The data is sourced from BNO News and includes information on the country, year, and cause of death."
        />
        <meta
          property="twitter:image"
          content="https://ebola-cases.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h1">New Cases - Statistics Details</Heading>
          <WorldTrends_NewCases />
          <Text mt={5} mb={5}>
            We report the number of total Ebola cases using data from the US
            CDC, the World Health Organization, and the Ugandan Ministry of
            Health. These numbers are compiled by BNO News. Today, the 2022
            Ebola outbreak is confined to Uganda, so our data is sourced from
            their site. NOTE: Figures include probable cases and deaths which
            occurred in the weeks before the outbreak was declared. Probable
            cases totaling 21 individuals are no longer updated and may not
            always be included in tallies published by other sources.
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
