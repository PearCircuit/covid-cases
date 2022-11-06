import Head from "next/head";

import { FaTwitter } from "react-icons/fa";
import dynamic from "next/dynamic.js";
import Chart from "chart.js/auto";

import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Tooltip,
  HStack,
  Show,
  Button,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";

import TwitterFeedEmbed from "./components/social/TwitterFeedEmbed.js";
import TwitterButton from "./components/social/TwitterButton.js";

import { colors } from "../styles/colors.js";

const WorldMapChart = dynamic(() => import("./components/WorldMap.js"), {
  ssr: false,
});
import WorldTable_FullHistory from "./components/WorldTable_FullHistory.js";

const WorldTrends_TotalCases = dynamic(
  () => import("./components/WorldTrends_TotalCases.js"),
  {
    ssr: false,
  }
);

const WorldTrends_NewCases = dynamic(
  () => import("./components/WorldTrends_NewCases.js"),
  {
    ssr: false,
  }
);

const WorldTrends_Hospitalizations = dynamic(
  () => import("./components/WorldTrends_Hospitalizations.js"),
  {
    ssr: false,
  }
);
const WorldTrends_Recoveries = dynamic(
  () => import("./components/WorldTrends_Recoveries.js"),
  {
    ssr: false,
  }
);

const WorldTrends_Deaths = dynamic(
  () => import("./components/WorldTrends_Deaths.js"),
  {
    ssr: false,
  }
);
const WorldTrends_CFR = dynamic(
  () => import("./components/WorldTrends_CFR.js"),
  {
    ssr: false,
  }
);

import { useState, useEffect } from "react";
import { csv } from "csvtojson";
import ReactTooltip from "react-tooltip";

export default function Home() {
  const [content, setContent] = useState("");

  const [data, setData] = useState([]);
  const [latestCaseTotal, setLatestCaseTotal] = useState("");
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQelcvFosb_CZfKBlXr4C-n8xXGb7oPalH7tPJwLWbQynuu5vY2UW9sADUTPXoodmTq3eF6fvjbBLnG/pub?gid=0&single=true&output=csv";

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        const jsonArray = await csv().fromString(text);
        setData(jsonArray);

        setLatestCaseTotal(
          jsonArray.reduce(
            (total, current) => Number(total) + Number(current.new_cases),
            0
          )
        );
        console.log(latestCaseTotal);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="en-gb" />

        <title>
          Ebola Cases | {currentMonth} {currentYear} Ebola Cases
        </title>
        <meta
          name="description"
          content="Statistics and information on the 2022 Ebola virus disease outbreak, including maps, charts, and tables from sources around the world."
        />

        <meta property="og:title" content="Ebola Tracker - Ebola Statistics" />
        <meta
          property="og:description"
          content="Statistics and information on the 2022 Ebola virus disease outbreak, including maps, charts, and tables from sources around the world."
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
          content="Statistics and information on the 2022 Ebola virus disease outbreak, including maps, charts, and tables from sources around the world."
        />
        <meta
          property="twitter:image"
          content="https://ebola-cases.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxW={"8xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 5, md: 5 }}
            py={{ base: 10, md: 10 }}
          >
            <Heading as="h1" size="2xl">
              Your realtime dashboard for the 2022 Ebola outbreak
            </Heading>

            <Text maxW={"5xl"}>
              We have partnered with BNO News to bring you live updates on the
              2022 Ebola virus disease outbreak. You can follow us on twitter
              for more updates, or follow{" "}
              <a
                href="https://twitter.com/BNOFeed"
                style={{ color: `${colors.rubyRed}` }}
              >
                BNO News
              </a>{" "}
              for details about other health crises around the world.
            </Text>

            <TwitterButton />
          </Stack>
        </Container>

        <Container maxW="8xl" mt="1vh">
          <SimpleGrid
            columns={[1, null, 3]}
            minChildWidth="350px"
            spacingX="10px"
            spacingY="0px"
          >
            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Deaths
                </Heading>
                <WorldTrends_Deaths />
              </Box>
            </GridItem>
            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Cases
                </Heading>
                <WorldTrends_TotalCases />
              </Box>
            </GridItem>

            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  New Cases
                </Heading>
                <WorldTrends_NewCases />
              </Box>
            </GridItem>

            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Hospitalizations
                </Heading>
              </Box>
              <WorldTrends_Hospitalizations />
            </GridItem>

            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Recoveries
                </Heading>
              </Box>
              <WorldTrends_Recoveries />
            </GridItem>

            <GridItem>
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Case Fatality Rate
                </Heading>
              </Box>
              <WorldTrends_CFR />
            </GridItem>
          </SimpleGrid>
        </Container>

        <Container maxW={"8xl"} mt="5vh">
          <Box textAlign={"center"}>
            <Heading as="h2" size="md" mb={5}>
              Global confirmed Ebola cases
            </Heading>
            <WorldTable_FullHistory />
            <Text mb={5} color={"gray.500"}>
              Source:{" "}
              <a href={"https://www.health.go.ug/ebola/"}>
                Ugandan Ministry of Health
              </a>
              . Last update: {Date().toLocaleString().substring(0, 16)}
            </Text>
          </Box>
        </Container>

        <Container maxW={"2xl"} mt="5vh">
          <Box textAlign={"center"}>
            <TwitterFeedEmbed />
          </Box>
        </Container>
      </main>
    </>
  );
}
