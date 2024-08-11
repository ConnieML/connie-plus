import React, { Component } from "react";
import { Heading } from "@twilio-paste/heading";
import { Usagetable } from "./Usagetable";
import { Box, Separator, Stack } from "@twilio-paste/core";
import { Flex } from "@twilio-paste/flex";
import { Text } from "@twilio-paste/text";
import { Button } from "@twilio-paste/button";
import { Select, Option, Label } from "@twilio-paste/core";
import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";

export class Maincontainer extends Component {
  render() {
    return (
      <Box paddingLeft="space70" paddingRight="space160" paddingTop="space40">
        <Stack orientation="vertical" spacing="space60">
          <Heading as="h1" variant="heading10">
            Subaccount All Product Usage{" "}
          </Heading>
          <Box>
            <Flex>
              <Flex grow>
                <Text
                  as="p"
                  fontWeight="fontWeightBold"
                  fontSize="fontSize30"
                  marginBottom="space40"
                  color="colorText"
                >
                  Subaccount Name:
                </Text>
                <Text
                  as="p"
                  fontWeight="fontWeightNormal"
                  fontSize="fontSize30"
                  marginBottom="space40"
                  color="colorText"
                >
                  ABC Subsidiary
                </Text>
              </Flex>
              <Flex>
                <Button variant="secondary" size="small">
                  View this Subaccount
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Flex>
              <Flex grow>
                <Box>
                  <Label htmlFor="default_value_demo">Date </Label>
                  <Select
                    id="date_group"
                    htmlFor="date_group"
                    defaultValue="Oct2020"
                  >
                    <Option value="Oct2020">October 2020</Option>
                    <Option value="Sept2020">September 2020</Option>
                    <Option value="AUg2020">August 2020</Option>
                  </Select>
                </Box>
              </Flex>
              <Flex>
                <Box paddingTop="space80">
                  <Stack orientation="horizontal" spacing="space40">
                    <Text
                      as="p"
                      fontWeight="fontWeightNormal"
                      fontSize="fontSize60"
                      marginBottom="space40"
                      color="colorText"
                    >
                      Total this month:{" "}
                    </Text>
                    <Text
                      as="p"
                      fontWeight="fontWeightBold"
                      fontSize="fontSize60"
                      marginBottom="space40"
                      color="colorText"
                    >
                      $380,700.75665{" "}
                    </Text>
                  </Stack>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Flex>
              <Flex>
                <Text
                  as="p"
                  fontWeight="fontWeightNormal"
                  fontSize="fontSize30"
                  color="colorText"
                  marginRight="space20"
                >
                  Please note: This console only provides real-time and
                  estimated costs associated with usage and is not
                  comprehensive.
                </Text>
              </Flex>
              <Flex grow>
                <Button variant="link">
                  <InformationIcon
                    decorative={false}
                    title="Usage estimate note"
                  />
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Separator orientation="horizontal" verticalSpacing="space10" />
          <Usagetable />
        </Stack>
      </Box>
    );
  }
}

export default Maincontainer;
