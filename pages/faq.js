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
        <title>Ebola Cases | FAQ</title>
        <meta httpEquiv="content-language" content="en-gb" />

        <meta
          name="description"
          content="Frquently asked questions about ebola as a disease, including symptom information, treatment information, vaccination information, and statistics."
        />

        <meta property="og:title" content="Ebola Tracker | FAQ" />
        <meta
          property="og:description"
          content="Frquently asked questions about ebola as a disease, including symptom information, treatment information, vaccination information, and statistics."
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
          content="Frquently asked questions about ebola virus, including symptom information, treatment information, vaccination information, and statistics."
        />
        <meta
          property="twitter:image"
          content="https://ebola-cases.com/socialImg.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container mt={10} mb={10} maxW={"5xl"}>
          <Heading as="h2">Frequently Asked Questions</Heading>
          <Text>
            Want to learn more about Ebola? The following are some frequently
            asked questions about the ebola virus, the current disease outbreak,
            and what to do if you are exposed to ebola.
          </Text>
          <Accordion allowToggle allowMultiple mt={10} mb={10}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>What is Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  This rare, infectious—and often fatal—disease was discovered
                  in 1976 in the Democratic Republic of Congo near the Ebola
                  River. Scientists believe that bats are the most likely
                  carriers of the Ebola virus. Symptoms include the sudden onset
                  of fever, fatigue, muscle pain, headache, and sore throat.
                  This is followed by vomiting, diarrhea, rash, and in some
                  cases, bleeding.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>Where does our data come from?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                We take a very conservative approach to reporting data. Numbers
                reported on this site are compiled from reports by the US CDC,
                the Ugandan Ministry of Health, or the WHO. You will note
                call-outs beneath most data indicating which of the two sources
                provided the data displayed. The Ugandan MOH website here is our
                current primary source: https://www.health.go.ug/.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>What should I do if I think I have Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  Stay home if you feel unwell. If you have a fever, cough and
                  difficulty breathing, seek medical attention and call in
                  advance. Follow the directions of your local health authority.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>What are my chances of death if I have Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  About half of all people infected with Ebola die, but case
                  fatality rates have varied. Case fatality rates have varied
                  from 25% to 90% in past outbreaks, according to the WHO.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>What are the symptoms of Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>Symptoms of Ebola can include:</p>
                <ul>
                  <li>Fever </li>
                  <li>Headache and muscle and joint pain</li>
                  <li>Weakness and fatigue</li>
                  <li>Sore throat</li>
                  <li>Loss of apetite</li>
                  <li>
                    Gastrointestinal symptoms including abdominal pain,
                    diarrhea, and vomiting
                  </li>
                  <li>Unexplained hemorrhaging, bleeding or bruising</li>
                </ul>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>How often is the data updated?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Data is updated every few hours. Note that our sources may not
                have any updates to their own data during this time, so
                sometimes it may appear as if data is stale or has not changed,
                even if we have fetched new numbers since your last visit.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>How can I view country-specific data?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can view data for specific countries by visiting the
                countries tab in the navigation, or by clicking on a country
                with data on the map on the homepage. Note that not all
                countries have data at this time, and thus not all countries
                have detail pages. You can also use this link to travel to the{" "}
                <Link href="/countries" aria-label="Countries" m={5} w="100%">
                  <a style={{ color: `${colors.rubyRed}` }}>
                    countries listing
                  </a>
                </Link>{" "}
                page.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>How does Ebola spread?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  It is thought that fruit bats of the Pteropodidae family are
                  natural Ebola virus hosts. Ebola is introduced into the human
                  population through close contact with the blood, secretions,
                  organs or other bodily fluids of infected animals such as
                  fruit bats, chimpanzees, gorillas, monkeys, forest antelope or
                  porcupines found ill or dead or in the rainforest.
                  <br /> <br />
                  Ebola then spreads through human-to-human transmission via
                  direct contact, through broken skin or mucous membranes, with:
                  <br /> <br />
                  1. Blood or body fluids of a person who is sick with or has
                  died from Ebola
                  <br /> <br />
                  2. Objects that have been contaminated with body fluids, like
                  blood, feces, vomit, from a person sick with Ebola or the body
                  of a person who died from Ebola Health-care workers have
                  frequently been infected while treating patients with
                  suspected or confirmed EVD. This occurs through close contact
                  with patients when infection control precautions are not
                  strictly practiced.
                  <br /> <br />
                  Burial ceremonies that involve direct contact with the body of
                  the deceased can also contribute in the transmission of Ebola.
                  <br /> <br />
                  People remain infectious as long as their blood contains the
                  virus.
                  <br /> <br />
                  Pregnant women who get acute Ebola and recover from the
                  disease may still carry the virus in breastmilk, or in
                  pregnancy related fluids and tissues. This poses a risk of
                  transmission to the baby they carry, and to others. Women who
                  become pregnant after surviving Ebola disease are not at risk
                  of carrying the virus.
                  <br /> <br />
                  If a breastfeeding woman who is recovering from Ebola wishes
                  to continue breastfeeding, she should be supported to do so.
                  Her breast milk needs to be tested for Ebola before she can
                  start.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>Is Ebola a sexually transmitted infection (STI)?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  Based on further analysis of ongoing research and
                  consideration by the WHO Advisory Group on the Ebola Virus
                  Disease Response, WHO recommends that male survivors of EVD
                  practice safer sex and hygiene for 12 months from onset of
                  symptoms or until their semen tests negative twice for Ebola
                  virus. Contact with body fluids should be avoided and washing
                  with soap and water is recommended. WHO does not recommend
                  isolation of male or female convalescent patients whose blood
                  has been tested negative for Ebola virus.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>How can I avoid catching Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  Good outbreak control relies on applying a package of
                  interventions, including case management, surveillance and
                  contact tracing, a good laboratory service, safe burials and
                  social mobilisation. Community engagement is key to
                  successfully controlling outbreaks. Raising awareness of risk
                  factors for Ebola infection and protective measures (including
                  vaccination) that individuals can take is an effective way to
                  reduce human transmission.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>Is there a cure or treatment for Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  Supportive care - rehydration with oral or intravenous fluids
                  - and treatment of specific symptoms improves survival. A
                  range of potential treatments including blood products, immune
                  therapies and drug therapies are currently being evaluated.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <b>Is there a vaccine for Ebola?</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  The Ervebo vaccine has been shown to be effective in
                  protecting people from the species Zaire ebolavirus, and is
                  recommended by the Strategic Advisory Group of Experts on
                  Immunization as part of a broader set of Ebola outbreak
                  response tools. In December 2020, the vaccine was approved by
                  the US Food and Drug Administration and prequalified by WHO
                  for use in individuals 18 years of age and older (except for
                  pregnant and breastfeeding women) for protection against Ebola
                  virus disease caused by Zaïre Ebola virus.
                  <br />
                  <br />
                  The vaccine had been administrated to more than 350 000 people
                  in Guinea and in the 2018-2020 Ebola virus disease outbreaks
                  in the Democratic Republic of the Congo under “compassionate
                  use” protocol. The vaccine has shown to safe and effective
                  against the species Zaire ebolavirus. A global stockpile of
                  the Ervebo vaccine has become available starting January 2021.
                  <br />
                  <br />
                  In May 2020, the European Medicines Agency recommended
                  granting marketing authorization for a 2-component vaccine
                  called Zabdeno-and-Mvabea for individuals 1 year and older.
                  <br />
                  <br />
                  The vaccine is delivered in 2 doses: Zabdeno is administered
                  first and Mvabea is given approximately 8 weeks later as a
                  second dose. This prophylactic 2-dose regimen is therefore not
                  suitable for an outbreak response where immediate protection
                  is necessary.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </div>
    </>
  );
}
