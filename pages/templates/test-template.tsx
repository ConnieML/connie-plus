import * as React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { Alert } from '@twilio-paste/core/alert';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Stack } from '@twilio-paste/core/stack';
import { PlusIcon } from '@twilio-paste/icons/cjs/PlusIcon';
import { ChevronRightIcon } from '@twilio-paste/icons/cjs/ChevronRightIcon';
import { ProcessSuccessIcon } from '@twilio-paste/icons/cjs/ProcessSuccessIcon';
import { ProcessWarningIcon } from '@twilio-paste/icons/cjs/ProcessWarningIcon';
import { ProcessErrorIcon } from '@twilio-paste/icons/cjs/ProcessErrorIcon';
import { Table } from '@twilio-paste/core';
import { THead } from '@twilio-paste/core';
import { Tr } from '@twilio-paste/core';
import { Th } from '@twilio-paste/core';
import { TBody } from '@twilio-paste/core';
import { Td } from '@twilio-paste/core';


const test: NextPage = () => {
    return (
<Box as="main" padding="space70">

<Stack orientation="horizontal" spacing="space30">
  <Button variant="primary" onClick={() => {}}>
    Primary
  </Button>
  <Button variant="primary" onClick={() => {}}>
    <PlusIcon decorative />
    Create new
  </Button>
  <Button variant="primary" onClick={() => {}}>
    Next
    <ChevronRightIcon decorative />
  </Button>
</Stack>

<Table>
  <THead>
    <Tr>
      <Th>Data Source:</Th>
      <Th>Database</Th>
      <Th>Resources</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2020-09-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          MySQL
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="Available" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-05-31</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          MongoDB
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="invalid" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2020-09-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          SupaBase
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
</Table>

<Table>
  <THead>
    <Tr>
    <Th>Data Source:</Th>
    <Th>Spreadsheet</Th>
    <Th>Resources</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-12</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Airtable
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-12</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          GSuite
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="In Development" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-09-01</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
        Office365
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
</Table>
<Table>
  <THead>
    <Tr>
    <Th>Data Source:</Th>
    <Th>CRM / EMR </Th>
    <Th>Integration Steps</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2023-05-08</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
        <Anchor href="https://www.hubspot.com/" showExternal>
              Hubspot
            </Anchor>
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="Available" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Zoho
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="invalid" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-09-01</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Monday
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
</Table>

</Box>
);
};
export default test