// import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { DataBarChartIcon } from '@twilio-paste/icons/cjs/DataBarChartIcon';
import { DatabaseIcon } from '@twilio-paste/icons/cjs/DatabaseIcon';
import { PinIcon } from '@twilio-paste/icons/cjs/PinIcon';
import { UnpinIcon } from '@twilio-paste/icons/cjs/UnpinIcon';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';

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
      Data & Reporting Center
    </Heading><Paragraph>
        Welcome to the Connie Data Center. Select the DATA option below to access all stored data and resources associated with your Connie account.
        In addition to raw data, you can access powerful dashboard and KPI reports and easily download or share them with your stakholders from the REPORTS section.
        both realtime and historical Or click to go{' '}
        <Anchor href="/">Home</Anchor>.
      </Paragraph><Heading as="h2" variant="heading20">
        Programmable Communications
      </Heading><Grid gutter="space30" marginBottom="space50">
        <Column>
          <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <DatabaseIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="#">Data</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <PinIcon decorative={false} title="Pin Messaging to navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Access unfiltered data sets</Paragraph>
                <Anchor href="#" showExternal>
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
                <DataBarChartIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="#">Reports</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Access preformatted Dashboard and KPI reports or build your own!</Paragraph>
                <Anchor href="#" showExternal>
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