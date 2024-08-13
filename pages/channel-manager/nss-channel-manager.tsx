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
import { EmailIcon } from "@twilio-paste/icons/esm/EmailIcon";
import { VoiceCapableIcon } from '@twilio-paste/icons/cjs/VoiceCapableIcon';
import { AttachmentIcon } from "@twilio-paste/icons/esm/AttachmentIcon";
import { LoadingIcon } from "@twilio-paste/icons/esm/LoadingIcon";
import { ArrowDownIcon } from "@twilio-paste/icons/esm/ArrowDownIcon";
import { WebCapableIcon } from "@twilio-paste/icons/esm/WebCapableIcon";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";

export default function Home() {
  return (
    <Box as="main" padding="space70">
    <>
      <Heading as="h1" variant="heading10">
        <Flex hAlignContent="between" vAlignContent="center">
          @ NSS Active Connie Channels <Button variant="primary">Need Help?</Button>
        </Flex>
      </Heading>
      <Paragraph>
      Welcome CBO Admin! To learn more about Connie Channels, check out the Channel Management section of the Administrators Quick Start docs. Click the Roadmap button below to see if it's currently in development or contact the Connie Cares Team for more information. Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Text as="dd" fontWeight="fontWeightBold">📞 NSS Active Legacy Telco Channels</Text>

      <Table>
        <THead>
          <Tr>
            <Th>Number</Th>
            <Th>Friendly Name</Th>
            <Th>Capabilities</Th>
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
              <VoiceCapableIcon title="Voice capable" decorative={false} />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" decorative={false} />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" decorative={false} />
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
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
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
            <Td>
              <FaxCapableIcon title="Fax capable" decorative={false} />
            </Td>
            <Td>
              <FaxCapableIcon title="Fax capable" decorative={false} />
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
                    <Text color="colorTextWeak" as={'symbol'}>Callback URL:</Text> mailto:fax@connie.host
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Connie Workflow:</Text>{' '}
                    <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
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
              <VoiceCapableIcon title="Voice capable" decorative={false} />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" decorative={false} />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" decorative={false} />
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
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
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
              <VoiceCapableIcon title="Voice capable" decorative={false} />
            </Td>
            <Td>&nbsp;</Td>
            <Td>
              <SMSCapableIcon title="SMS capable" decorative={false} />
            </Td>
            <Td>
              <MMSCapableIcon title="MMS capable" decorative={false} />
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
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Text as="dd" fontWeight="fontWeightBold">📧 NSS Active Email Channels</Text>

      <Table>
        <THead>
          <Tr>
            <Th>Public Address</Th>
            <Th>Friendly From</Th>
            <Th>Capabilities</Th>
            <Th>Configuration</Th>
            <Th>Actions</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Anchor href="#">Setup Required</Anchor>
              <br />
            </Td>
            <Td>Nevada Senior Services Client Team</Td>
            <Td>
              <EmailIcon title="Email capable" decorative={false} />
            </Td>
            <Td>
              <LoadingIcon title="Inbound & Outbound capable" decorative={false} />
            </Td>
            <Td>
              <AttachmentIcon title="Attachment capable" decorative={false} />
            </Td>
            <Td>
              &nbsp;
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
                    <Anchor href="https://console.twilio.com/us1/service/studio/FW8274262a9c4dda317609d9f50f5514c2/studio-flow-instance-canvas?frameUrl=%2Fconsole%2Fstudio%2Fflows%2FFW8274262a9c4dda317609d9f50f5514c2%3Fx-target-region%3Dus1" showExternal>nss.partner@connie.host_email_flow</Anchor>
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="mailto:nss.partner@connie.host" showExternal>nss.partner@connie.host</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">Setup Required</Anchor>
              <br />
            </Td>
            <Td>Nevada Senior Services Partners Team</Td>
            <Td>
              <EmailIcon title="Email capable" decorative={false} />
            </Td>
            <Td>
            <LoadingIcon title="Inbound & Outbound capable" decorative={false} />
            </Td>
            <Td>
              <AttachmentIcon title="Attachment capable" decorative={false} />
            </Td>
            <Td>
              &nbsp;
            </Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Callback URL:</Text> mailto:fax@connie.host
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Connie Workflow:</Text>{' '}
                    <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">+1 702 718 5383</Anchor>
              <br />
            </Td>
            <Td>NSS Fax</Td>
            <Td>
            <FaxCapableIcon title="Fax capable" decorative={false} />
            </Td>
            <Td>
              <ArrowDownIcon title="Inbound cabable" decorative={false}> </ArrowDownIcon>
            </Td>
            <Td>
            &nbsp;
            </Td>
            <Td>
            &nbsp;
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
                    <Anchor href="https://console.twilio.com/us1/service/studio/FW4a8f77efed3228912d24048bd756e510/studio-flow-instance-canvas?frameUrl=%2Fconsole%2Fstudio%2Fflows%2FFW4a8f77efed3228912d24048bd756e510%3Fx-target-region%3Dus1" showExternal>H2H_FAX</Anchor>
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="mailto:fax@connie.host" showExternal>fax@connie.host</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Text as="dd" fontWeight="fontWeightBold">📱 NSS Active Web Channels</Text>

      <Table>
        <THead>
          <Tr>
            <Th>Public Address</Th>
            <Th>Friendly Name</Th>
            <Th>Capabilities</Th>
            <Th>Configuration</Th>
            <Th>Actions</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Anchor href="#">Web Chat</Anchor>
              <br />
              hospital2home.org
            </Td>
            <Td>nssWebChat3.0</Td>
            <Td>
              <WebCapableIcon title="Desktop & Mobile" decorative={false} />
            </Td>
            <Td>
            <ArrowDownIcon title="Inbound capable" decorative={false}> </ArrowDownIcon>
            </Td>
            <Td>
            <AttachmentIcon title="Attachment capable" decorative={false} />
            </Td>
            <Td>
              &nbsp;
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
                    <Text color="colorTextWeak" as={'symbol'}>Proxy Service:</Text> <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Anchor href="#">Social Media</Anchor>
              <br />
              Facebook Messenger
            </Td>
            <Td>nssWebChat3.0</Td>
            <Td>
              <WebCapableIcon title="Desktop & Mobile" decorative={false} />
            </Td>
            <Td>
            <ArrowDownIcon title="Inbound capable" decorative={false}> </ArrowDownIcon>
            </Td>
            <Td>
            <AttachmentIcon title="Attachment capable" decorative={false} />
            </Td>
            <Td>
              &nbsp;
            </Td>
            <Td>
              <Text as="dl">
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Voice
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Callback URL:</Text> mailto:fax@connie.host
                  </Text>
                </Box>
                <Box display="flex">
                  <Box as="dt" fontWeight="fontWeightBold" width="100px">
                    Messaging
                  </Box>
                  <Text as="dd">
                    <Text color="colorTextWeak" as={'symbol'}>Connie Workflow:</Text>{' '}
                    <Anchor href="#">Coming Soon!</Anchor>
                  </Text>
                </Box>
              </Text>
            </Td>
            <Td>
              <Button variant="destructive_link">
                <DeleteIcon title="Delete" decorative={false} />
              </Button>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </>
    </Box>
  );
}
