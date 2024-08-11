import React, { Component } from "react";
import { Table, TBody, Td, Th, THead, Tr } from "@twilio-paste/table";
import { Text } from "@twilio-paste/core";
import {
  Disclosure,
  DisclosureHeading,
  DisclosureContent
} from "@twilio-paste/disclosure";
import { Separator } from "@twilio-paste/separator";
import { Box } from "@twilio-paste/core";

export class Usagetable extends Component {
  render() {
    return (
      <Box>
        <Table>
          <THead>
            <Tr>
              <Th>Product</Th>
              <Th textAlign="center" width="size30">
                Quantity
              </Th>
              <Th textAlign="right" width="size30">
                Amount
              </Th>
            </Tr>
          </THead>
        </Table>
        <Box paddingTop="space50">
          <Disclosure>
            <DisclosureHeading as="h5" variant="heading50">
              <Text as="p">Account</Text>
            </DisclosureHeading>
            <DisclosureContent>
              <Table>
                <TBody>
                  <Tr>
                    <Th>Product</Th>
                    <Th textAlign="center" width="size30">
                      Quantity
                    </Th>
                    <Th textAlign="right" width="size30">
                      Amount
                    </Th>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Super SIM</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="span" fontFamily="fontFamilyCode">
                        4 units
                      </Text>
                    </Td>
                    <Td textAlign="right">$1.00</Td>
                  </Tr>
                </TBody>
              </Table>
            </DisclosureContent>
          </Disclosure>
          <Separator orientation="horizontal" verticalSpacing="space50" />
          <Disclosure>
            <DisclosureHeading as="h5" variant="heading50">
              Add-Ons
            </DisclosureHeading>
            <DisclosureContent>
              <Table>
                <TBody>
                  <Tr>
                    <Th>Product</Th>
                    <Th textAlign="center" width="size30">
                      Quantity
                    </Th>
                    <Th textAlign="right" width="size30">
                      Amount
                    </Th>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">
                        Add-on : Algorithmia Named Entity Recognition
                      </Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 unites</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Add-on: Cadence Transcription</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 unites</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Add-on : Wolfram Spoken Results</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 unites</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>
                      <Text as="p">Add-on : Google Speech to Text</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 unites</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                </TBody>
              </Table>
            </DisclosureContent>
          </Disclosure>
          <Separator orientation="horizontal" verticalSpacing="space50" />

          <Disclosure>
            <DisclosureHeading as="h5" variant="heading50">
              Authy
            </DisclosureHeading>
            <DisclosureContent>
              <Table>
                <TBody>
                  <Tr>
                    <Th>Product</Th>
                    <Th textAlign="center" width="size30">
                      Quantity
                    </Th>
                    <Th textAlign="right" width="size30">
                      Amount
                    </Th>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Authy Outbound SMS Messages</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">4 segments</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Authy Authentications</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 authentications</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Authy Monthly Fees</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 months</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text as="p">Authy Phone Intelligence Requests</Text>
                    </Td>
                    <Td textAlign="center">
                      <Text as="p">2 requests</Text>
                    </Td>
                    <Td textAlign="right">
                      <Text as="p">$1.00</Text>
                    </Td>
                  </Tr>
                </TBody>
              </Table>
            </DisclosureContent>
          </Disclosure>
          <Separator orientation="horizontal" verticalSpacing="space50" />

          <Disclosure>
            <DisclosureHeading as="h5" variant="heading50">
              Internet of Things
            </DisclosureHeading>
            <DisclosureContent>
              <Box paddingLeft="space50">
                <Disclosure>
                  <DisclosureHeading as="h5" variant="heading50">
                    Commands
                  </DisclosureHeading>
                  <DisclosureContent>
                    <Table>
                      <TBody>
                        <Tr>
                          <Th>Product</Th>
                          <Th textAlign="center" width="size30">
                            Quantity
                          </Th>
                          <Th textAlign="right" width="size30">
                            Amount
                          </Th>
                        </Tr>{" "}
                        <Tr>
                          <Td>
                            <Text as="p">North America</Text>
                          </Td>
                          <Td>
                            <Text as="p" textAlign="center">
                              4 commands
                            </Text>
                          </Td>
                          <Td textAlign="right">
                            <Text as="p">$1.00</Text>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Text as="p">Europe</Text>
                          </Td>
                          <Td textAlign="center">
                            <Text as="p">5 commands</Text>
                          </Td>
                          <Td textAlign="right">
                            <Text as="p">$1.00</Text>
                          </Td>
                        </Tr>
                      </TBody>
                    </Table>
                  </DisclosureContent>
                </Disclosure>
              </Box>
            </DisclosureContent>
          </Disclosure>
        </Box>
        <Separator orientation="horizontal" verticalSpacing="space50" />
      </Box>
    );
  }
}

export default Usagetable;
