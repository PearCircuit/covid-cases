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
import Link from "next/link";

import TwitterFeedEmbed from "./components/social/TwitterFeedEmbed.js";
import TwitterButton from "./components/social/TwitterButton.js";

import { colors } from "../styles/colors.js";

const WorldMap = dynamic(() => import("./components/WorldMap.js"), {
  ssr: false,
});
import WorldTable_FullHistory from "./components/WorldTable_FullHistory.js";

const WorldTrends_TotalCases = dynamic(
  () => import("./components/worldTrends/WorldTrends_TotalCases.js"),
  {
    ssr: false,
  }
);

const WorldTrends_NewCases = dynamic(
  () => import("./components/worldTrends/WorldTrends_NewCases.js"),
  {
    ssr: false,
  }
);

const WorldTrends_NewDeaths = dynamic(
  () => import("./components/worldTrends/WorldTrends_NewDeaths.js"),
  {
    ssr: false,
  }
);

const WorldTrends_Deaths = dynamic(
  () => import("./components/worldTrends/WorldTrends_Deaths.js"),
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
          Covid Cases | {currentMonth} {currentYear} Covid Cases
        </title>
        <meta
          name="description"
          content="Statistics and information on the 2022 Covid pandemic, including maps, charts, and tables from sources around the world."
        />

        <meta property="og:title" content="Covid Tracker - Covid Statistics" />
        <meta
          property="og:description"
          content="Statistics and information on the 2022 Covid pandemic, including maps, charts, and tables from sources around the world."
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
          content="Statistics and information on the 2022 Covid pandemic, including maps, charts, and tables from sources around the world."
        />
        <meta
          property="twitter:image"
          content="https://covid-tracker/socialImg.png"
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
              Your realtime dashboard for the ongoing Covid pandemic
            </Heading>
            <Text maxW={"5xl"}>
              Select a country to view more data, or scroll for more
              information.
            </Text>
            <TwitterButton />
          </Stack>
        </Container>

        <Container maxW={"4xl"} mt={5} mb={5}>
          <WorldMap setTooltipContent={setContent} />
          {content && (
            <ReactTooltip>
              <Tooltip>{content}</Tooltip>
            </ReactTooltip>
          )}
        </Container>

        <Container maxW={"8xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 5, md: 5 }}
            py={{ base: 10, md: 10 }}
          >
            <Text maxW={"5xl"}>
              We have partnered with BNO News to bring you live updates on the
              2022 Covid pandemic. Follow{" "}
              <a
                href="https://twitter.com/BNOFeed"
                style={{ color: `${colors.tenneTawny}` }}
              >
                BNO News
              </a>{" "}
              for details about other health crises around the world.
            </Text>
          </Stack>
        </Container>

        <Container maxW="9xl" mt="1vh">
          <SimpleGrid
            columns={[1, null, 4]}
            minChildWidth="320px"
            spacingX="10px"
            spacingY="30px"
          >
            <GridItem className="homepage-clickable-grid">
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Deaths
                </Heading>
                <WorldTrends_Deaths />
                <Link href="/world-trend-details/deaths-detail">
                  <Button>Details</Button>
                </Link>
              </Box>
            </GridItem>

            <GridItem className="homepage-clickable-grid">
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  Total Cases
                </Heading>
                <WorldTrends_TotalCases />
                <Link href="/world-trend-details/total-cases-detail">
                  <Button>Details</Button>
                </Link>
              </Box>
            </GridItem>

            <GridItem className="homepage-clickable-grid">
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  New Cases
                </Heading>
                <WorldTrends_NewCases />

                <Link href="/world-trend-details/new-cases-detail">
                  <Button>Details</Button>
                </Link>
              </Box>
            </GridItem>
            <GridItem className="homepage-clickable-grid">
              <Box textAlign={"center"}>
                <Heading as="h2" size="md" mb={1}>
                  New Deaths
                </Heading>
                <WorldTrends_NewDeaths />

                <Link href="/world-trend-details/new-deaths-detail">
                  <Button>Details</Button>
                </Link>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Container>

        {/*} <Container maxW={"2xl"} mt="5vh">
          <Box textAlign={"center"}>
            <TwitterFeedEmbed />
          </Box>
        </Container> */}

        <Container maxW={"8xl"} mt="5vh">
          <Box textAlign={"center"}>
            <Heading as="h2" size="md" mb={5}>
              Global confirmed Covid cases
            </Heading>
            <WorldTable_FullHistory />
            <Text mb={5} color={"gray.500"}>
              Source:{" "}
              <a href={"https://ourworldindata.org/coronavirus"}>
                Our World in Data
              </a>
              . Last update: {Date().toLocaleString().substring(0, 16)}
            </Text>
          </Box>
        </Container>
      </main>
    </>
  );
}
