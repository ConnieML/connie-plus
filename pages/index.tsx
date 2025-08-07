// import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { ProductUsageIcon } from '@twilio-paste/icons/cjs/ProductUsageIcon';
import { AgentIcon } from "@twilio-paste/icons/cjs/AgentIcon";
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';
import { AddListIcon } from '@twilio-paste/icons/cjs/AddListIcon';
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
      <title>Connie Plus NextJS App</title>
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
    
    <Box marginBottom="space60">
      <Paragraph>
        Welcome to Connie! This is your centralized hub for accessing Connie platform tools and resources. 
        Get up and running quickly with our organized toolkit for both agents and administrators. 
        Explore safely and efficiently!
      </Paragraph>
    </Box><Heading as="h2" variant="heading20">
        Get To Know Connie
      </Heading><Grid gutter="space30" marginBottom="space50">
        <Column>
        <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <AgentIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/agent-tools-data">Staff Agent Tools & Data</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <PinIcon decorative={false} title="Pin Chat to navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Helpful tools and resources for Staff Agents & Volunteers.</Paragraph>
                <Anchor href="https://bit.ly/connie-docs" showExternal>
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
                <AddListIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/admin-tools-data">Admin Tools & Data</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Network and account management tools. Data, reports and performance dashborards. Access recordings.</Paragraph>
                <Anchor href="https://bit.ly/connie-docs" showExternal>
                  docs
                </Anchor>
              </MediaBody>
            </MediaObject>
          </Card>
        </Column>
      </Grid><Grid gutter="space30" marginBottom="space50">
        <Column>
        <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <ProductUsageIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="">Learning & Support Center</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <PinIcon decorative={false} title="Pin Messaging to navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Learn everything you need to know to Connie like a pro! Support services.</Paragraph>
                <Anchor href="https://bit.ly/connie-docs" showExternal>
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
                <NewIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="">Connie Showroom</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Fax from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Product Roadmap, pre-release demos, make a suggestion & win cool stuff!</Paragraph>
                <Anchor href="https://bit.ly/connie-docs" showExternal>
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