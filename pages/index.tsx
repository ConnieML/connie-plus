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
        Welcome to The Wonderful World of Connie!
      </Heading>

      <Paragraph>
        A playground for everything Connie where you learn about features and test them out before deploying into production. Start by editing{" "}
        <code>pages/index.tsx</code>
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Heading as="h2" variant="heading20">
        Useful links
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://paste.twilio.design" showExternal>
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
