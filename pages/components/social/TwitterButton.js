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

const TwitterButton = () => {
  return (
    <>
      {/*<div className="centerContent">
        <div className="selfCenter spaceBetween">
          <TwitterFollowButton
            onLoad={function noRefCheck() {}}
            options={{
              size: "large",
            }}
            screenName="ebola_cases"
          />
        </div>
          </div>*/}
    </>
  );
};

export default TwitterButton;
