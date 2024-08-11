import React from "react";
import { Box } from "@twilio-paste/core";
import { Text } from "@twilio-paste/core";
import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";
import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";
import { Flex } from "@twilio-paste/flex";
import { Stack } from "@twilio-paste/stack";


function Header() {
  return (
    <Box
      as="header"
      height="sizeSquare90"
      backgroundColor="colorBackgroundBodyInverse"
    >
      {" "}
      <Flex>
        <Flex grow>
          <Box
            paddingLeft="space40"
            paddingTop="space20"
            paddingBottom="space20"
            float="left"
          >
            <LogoTwilioIcon
              decorative={false}
              title="Description of icon"
              color="colorTextInverse"
            />
          </Box>
        </Flex>
        <Flex>
          <Box paddingTop="space20">
            <Stack orientation="horizontal" spacing="space20">
              <Text color="colorTextInverse">DOCS</Text>
              <ChevronDownIcon
                decorative={false}
                title="Description of icon"
                color="colorTextInverse"
              />
              <Text color="colorTextInverse">Phil Coulson</Text>
              <ChevronDownIcon
                decorative={false}
                title="Description of icon"
                color="colorTextInverse"
              />
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
