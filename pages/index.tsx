// import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { ProductUsageIcon } from '@twilio-paste/icons/cjs/ProductUsageIcon';
import { ProductVoiceIcon } from '@twilio-paste/icons/cjs/ProductVoiceIcon';
import { ProductChatIcon } from '@twilio-paste/icons/cjs/ProductChatIcon';
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
    <Heading as="h1" variant="heading10">
    Connie ➕
    </Heading><Paragraph>
    Welcome to Connie! This is a temporary landing page intended to get you get up and running in your new Connie account quickly and easly. It's also, intended to be playground where you can explore the wonderful world of Connie in 'safe mode'. So go ahead and start clicking! You can return to this page anytime by clicking {' '}
        <Anchor href="/">Home</Anchor>.
      </Paragraph><Heading as="h2" variant="heading20">
        Get To Know Connie
      </Heading><Grid gutter="space30" marginBottom="space50">
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
                      <Anchor href="/starthere">Start Here!</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <PinIcon decorative={false} title="Pin Messaging to navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Learn the basics here and you'll be a Connie pro in no time.</Paragraph>
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
                      <Anchor href="/tools-data">Tools & Data</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Access your work tools and customers records right here in this window!</Paragraph>
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
                <ProductVoiceIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/templates/feature-infos">Voice Tasks</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <PinIcon decorative={false} title="Pin Chat to navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Learn to accept, create, and manage customer calls as tasks in Connie.</Paragraph>
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
                <ProductChatIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/messaging-email-tasks">Messaging & Email</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Fax from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Send and receive SMS, Social Media, Webchat messages as tasks in Connie.</Paragraph>
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