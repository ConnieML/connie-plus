// import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { DataBarChartIcon } from '@twilio-paste/icons/cjs/DataBarChartIcon';
import { PlayIcon } from "@twilio-paste/icons/cjs/PlayIcon";
import { UnpinIcon } from '@twilio-paste/icons/cjs/UnpinIcon';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import { Stack } from "@twilio-paste/core/stack";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Alert } from "@twilio-paste/core/alert";


// import { PrototypeAnchor } from '../components/site/PrototypeAnchor';
const Demos: NextPage = () => {
  return (
  <>
    <Box as="main" padding="space70">
    <Head>
      <title>Connie Plus Data and Reporting Center</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Heading as="h1" variant="heading10">
      Connie Datacenter
    </Heading><Paragraph>
        Welcome to the Connie Datacenter! Select the Data & Reports option below to access all stored transaction data as well as powerful, readymade dashboard reports that you can send or download with one click. 
        In addition to raw data and dashboard reports, you can search for and access all stored media associated with completed tasks completed from the Playback Machine.
        both realtime and historical Or click to go{' '}
        <Anchor href="/">Home</Anchor>.
      </Paragraph><Heading as="h2" variant="heading20">
        Admin Data & Reporting Resources
        <CustomizationProvider
        baseTheme="default"
        elements={{
          ALERT: {
            borderRadius: "borderRadius30",
            variants: {
              error: {
                fontWeight: "fontWeightBold"
              },
              warning: {
                fontWeight: "fontWeightBold"
              }
            }
          },
          CUSTOM_ALERT: {
            borderRadius: "borderRadius30",
            borderStyle: "solid",
            borderWidth: "borderWidth10",
            paddingY: "space80",
            variants: {
              neutral: {
                borderColor: "colorBorderPrimaryWeak"
              },
              error: {
                borderColor: "colorBorderErrorWeak"
              },
              warning: {
                borderColor: "colorBorderWarningWeak"
              }
            }
          }
        }}
      >
        <Box padding="space100">
          <Stack orientation="vertical" spacing="space40">
            <Alert variant="neutral">PLEASE NOTE: As of Connie Prototype v1.5, All reporting feature and functions are still under active development. Currently, there are no customer report generation options available. To assemble customer reports, please download the raw data sets and import into a local spreadsheet application to build custom reports. Custom report generation will be generally available as of Connie MVPv1.0. If you would like early access to advanced Connie reporting features, please consider participainting our upcoming Advanced Reporting Cohort Group by contacting us <Anchor href="/empty-state">here</Anchor>.</Alert>
          </Stack>
        </Box>
      </CustomizationProvider>

      </Heading><Grid gutter="space30" marginBottom="space50">

        <Column>
          <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <DataBarChartIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/data-center/adhoc/adhoc-dashboard">Data & Reports</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Access raw transaction data and dashboard reports.</Paragraph>
                <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                  docs
                </Anchor>
              </MediaBody>
            </MediaObject>
          </Card>
        </Column>

        <Column>
          <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <PlayIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="#">Playback Machine</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Retrieve & playback task media & call recordings.</Paragraph>
                <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                  docs
                </Anchor>
              </MediaBody>
            </MediaObject>
          </Card>
        </Column>
      </Grid>
    </Box>
  </>
  );
};
export default Demos