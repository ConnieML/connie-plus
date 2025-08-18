import React from 'react';
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
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';





const Demos: NextPage = () => {
  return (
  <>
    <Box as="main" padding="space70">
    <Head>
      <title>Connie Plus Data and Reporting Center</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    {/* Logo Header */}
    <Box marginBottom="space60">
      <Anchor href="/">
        <img 
          src="/assets/connie-plus-logo.svg" 
          alt="Connie Platform Logo" 
          style={{ height: '40px', width: 'auto' }}
        />
      </Anchor>
    </Box>
    
    {/* Breadcrumb Navigation */}
    <Box marginBottom="space60">
      <Breadcrumb aria-label="breadcrumb">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Data Center</BreadcrumbItem>
      </Breadcrumb>
    </Box>
    
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
            <Alert variant="neutral">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box flex="1">
                  PLEASE NOTE: As of Connie Prototype v2.0, reporting features and functions are available for early stage user acceptance testing (UAT). While both the real-time and ad hoc reports are fully functional and actively displaying real channel data from your Connie account, please be mindful that you may experience inconsistencies in layout and data accuracy.
                </Box>
                <Box marginLeft="space40" fontSize="fontSize20" color="colorTextWeak" fontStyle="italic" whiteSpace="nowrap">
                  Updated August 12th 2025
                </Box>
              </Box>
            </Alert>
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
                      Analytics Dashboard
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>
                  Access data and insights from your CBO.{' '}
                  <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                    docs
                  </Anchor>
                </Paragraph>
                <Box marginTop="space40">
                  <Stack orientation="horizontal" spacing="space40">
                    <Button variant="primary" as="a" href="/data-center/nss-dashboard">
                      Daily Data
                    </Button>
                    <Button variant="secondary" as="a" href="#">
                      Adhoc Data
                    </Button>
                  </Stack>
                </Box>
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
                      Playback Machine
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>
                  Retrieve & playback task media & call recordings.{' '}
                  <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                    docs
                  </Anchor>
                </Paragraph>
                <Box marginTop="space40">
                  <Stack orientation="horizontal" spacing="space40">
                    <Button variant="primary" as="a" href="/data-center/voicemails">
                      Load Voicemails
                    </Button>
                    <Button variant="secondary" as="a" href="/data-center/faxes">
                      Load Faxes
                    </Button>
                  </Stack>
                </Box>
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