import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

import { Box, Center } from "@chakra-ui/react";

import { colors } from "../../../styles/colors";

const TwitterFeedEmbed = () => {
  return (
    <>
      <Box Center>
        <TwitterTimelineEmbed
          sourceType="profile"
          onLoad={function noRefCheck() {}}
          screenName="ebola_cases"
          linkColor="#9A031E"
          options={{
            height: 900,
          }}
        />
      </Box>
    </>
  );
};

export default TwitterFeedEmbed;
