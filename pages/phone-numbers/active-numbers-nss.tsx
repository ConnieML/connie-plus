import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Anchor } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';
import { Flex } from '@twilio-paste/core/flex';
import { Table, TBody, Th, THead, Tr, Td } from '@twilio-paste/core/table';
import { DeleteIcon } from '@twilio-paste/icons/cjs/DeleteIcon';
import { FaxCapableIcon } from '@twilio-paste/icons/cjs/FaxCapableIcon';
import { SMSCapableIcon } from '@twilio-paste/icons/cjs/SMSCapableIcon';
import { MMSCapableIcon } from '@twilio-paste/icons/cjs/MMSCapableIcon';
import { VoiceCapableIcon } from '@twilio-paste/icons/cjs/VoiceCapableIcon';
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";

export default function Home() {
  return (
    <Box as="main" padding="space70">
    <>
      <Heading as="h1" variant="heading10">
        <Flex hAlignContent="between" vAlignContent="center">
          @ NSS Active Connie Numbers <Button variant="primary">Add a number</Button>
        </Flex>
      </Heading>
      <Paragraph>
      Here you will find resources to help you manage your active Connie channels. As of August 11, 2024, only Voice and Fax channels are accessible from Channel Manager. Don't see the program or app you need? Click the Roadmap button below to see if it's currently in development or contact the Connie Cares Team for more information. Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Table>
        <THead>
          <Tr>
            <Th>Number</Th>
            <Th>Friendly Name</Th>
            <Th colSpan="4">Capabilities</Th>
            <Th>Configuration</Th>
            <Th>Actions</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Anchor href="#">+1 702 500 1954</Anchor>
              <br />
              Las Vegas, NV
            </Td>
            <Td>nss_frontdoor</Td>
            <Td>
              <VoiceCapableIcon title="Voice capable" />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" />
            </Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as="span">
                      Connie Workflow:
                    </Text>{' '}
                    <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak">Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">+1 702 718 5383</Anchor>
              <br />
              Las Vegas, NV
            </Td>
            <Td>nss_fax</Td>
            <Td>&nbsp;</Td>
            <Td>
              <FaxCapableIcon title="Fax capable" />
            </Td>
            <Td>&nbsp;</Td>
            <Td>&nbsp;</Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak">Callback URL:</Text> mailto:fax@connie.host
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak">Connie Workflow:</Text>{' '}
                    <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">+1 702 996 8438</Anchor>
              <br />
              Las Vegas, NV
            </Td>
            <Td>nss_h2h</Td>
            <Td>
              <VoiceCapableIcon title="Voice capable" />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" />
            </Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as="span">
                      Connie Workflow:
                    </Text>{' '}
                    <Anchor href="https://docs.google.com/presentation/d/1RLiiNVeil0Ff0xhjpTuDd7sIdT8LXoQ5zTDTi1uV7NM/edit?usp=sharing">Experience Map</Anchor>
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak">Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">+1 702 996 8439</Anchor>
              <br />
              Las Vegas, NV
            </Td>
            <Td>nss_daycare</Td>
            <Td>
              <VoiceCapableIcon title="Voice capable" />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" />
            </Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as="span">
                      Connie Workflow:
                    </Text>{' '}
                    <Anchor href="https://docs.google.com/presentation/d/1RLiiNVeil0Ff0xhjpTuDd7sIdT8LXoQ5zTDTi1uV7NM/edit?usp=sharing">Experience Map</Anchor>
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak">Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" />
              </Button>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </>
    </Box>
  );
}
