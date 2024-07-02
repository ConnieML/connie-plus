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
      👋 Start Here
      </Heading>

      <Paragraph>
      Below are links to helpful informations and guides to help you get started using Connie. Can't find what you're looking for? Click Get Help to concate the Connie Care Team. Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Heading as="h2" variant="heading20">
        Useful links
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://docs.google.com/presentation/d/1dDe1JF2AGNrY7Cdhwk00NxGBLe5baS1c/edit?usp=sharing&ouid=100905596054709529716&rtpof=true&sd=true" showExternal>
              Connie Docs For CBO Staff
            </Anchor>
          </Heading>
          <Paragraph>
            Start here. Find in-depth information about how to get started using Connie.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://docs.google.com/presentation/d/1dDe1JF2AGNrY7Cdhwk00NxGBLe5baS1c/edit?usp=sharing&ouid=100905596054709529716&rtpof=true&sd=true" showExternal>
              Connie Docs For CBO System Admins
            </Anchor>
          </Heading>
          <Paragraph>Find in-depth information about Connie systems & setting.</Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/demos">
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
