import * as React from "react";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core/box";
import { Card } from "@twilio-paste/core/card";
import { Flex } from "@twilio-paste/core/flex";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { ArrowForwardIcon } from "@twilio-paste/icons/cjs/ArrowForwardIcon";
import EmptyDeniedIllo from "./empty-denied.svg";

// export default function Home() {
function emptystate() {
  return (
    <Theme.Provider theme="twilio">
      <Box margin="space60">
        <Card>
          <Flex vAlignContent="center">
            <Box marginRight="space70">
              <Box as="img" src={EmptyDeniedIllo} alt="" />
            </Box>
            <Box>
              <Heading as="h3" variant="heading30">
                You don't have access to this page yet.
              </Heading>
              <Paragraph>
                You will be able to view it once your account administrator
                grants you the necessary privileges.
              </Paragraph>
              <Button variant="primary">
                Contact your account admin <ArrowForwardIcon decorative />
              </Button>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Theme.Provider>
  );
}
export default emptystate;