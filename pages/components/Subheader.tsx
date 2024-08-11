import React from "react";
import { Box } from "@twilio-paste/core";
import { Text } from "@twilio-paste/core";
import { Flex, Input } from "@twilio-paste/core";
import { Stack } from "@twilio-paste/stack";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";

function Subheader() {
  return (
    <Box
      as="header"
      height="sizeSquare160"
      backgroundColor="#e6e6e6"
      padding="space40"
    >
      <Flex>
        <Flex grow>
          <Box paddingTop="space30">
            <Stack orientation="horizontal" spacing="space20">
              <Text color="currentColor">Twilio Project</Text>
              <ChevronDownIcon
                decorative={false}
                title="Description of icon"
                color="currentColor"
              />

              <Text color="currentColor">Usage /</Text>
            </Stack>
          </Box>
        </Flex>
        <Flex>
          <Stack orientation="horizontal">
            <Input
              aria-describedby="email_help_text"
              id="email_address"
              name="email_address"
              type="email"
              placeholder="Go to.."
              insertBefore={<SearchIcon decorative={false} title="Search" />}
              onChange=""
              required
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Subheader;
