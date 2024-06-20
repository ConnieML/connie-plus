import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { ListItem, UnorderedList } from "@twilio-paste/core/list";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Connie Plus NextJS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" variant="heading10">
      👋 Welcome to Connie!
      </Heading>

      <Paragraph>
      This is a temporary home page intended to get you and your team up and running in your new Connie account quickly and easly. It's also, intended to be playground where you can explore the wonderful world of Connie in 'safe mode'. So go ahead and start clicking!
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Heading as="h2" variant="heading20">
        Useful links
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://connieconnect.com" showExternal>
              Connie Docs For CBO Staff
            </Anchor>
          </Heading>
          <Paragraph>
            Start here. Find in-depth information about how to get started using Connie.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://nextjs.org/docs" showExternal>
              Connie Docs For CBO System Admins
            </Anchor>
          </Heading>
          <Paragraph>Find in-depth information about Connie systems & setting.</Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/demos" showExternal>
              Feature Demos
            </Anchor>
          </Heading>
          <Paragraph>Explore Connie features to that help CBOs connect & engage.</Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/demos" showExternal>
              Road Map
            </Anchor>
          </Heading>
          <Paragraph>Learn about upcoming version releases & request new features. .</Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://vercel.com/import?filter=next.js" showExternal>
              Get Help
            </Anchor>
          </Heading>
          <Paragraph>Need a hand? We all do sometimes. You'll find all the support you need here.</Paragraph>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Home;
