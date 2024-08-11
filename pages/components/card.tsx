import React from "react";
import {Heading} from '@twilio-paste/core/heading';
import {Paragraph} from '@twilio-paste/core/paragraph';
import {Card} from '@twilio-paste/core/card';
import { Anchor } from "@twilio-paste/core/anchor";

function CardBox() {
  return (
    <Card>
    <Heading as="h2" variant="heading20">
      This is a Card
    </Heading>
    <Paragraph>
      Choose your leaders with wisdom and forethought. To be led by a coward is to be controlled by all that the
      coward fears. To be led by a fool is to be led by the opportunists who control the fool. To be led by a thief is
      to offer up your most precious treasures to be stolen. To be led by a liar is to ask to be lied to. To be led by
      a tyrant is to sell yourself and those you love into slavery.
    </Paragraph>
    <Paragraph marginBottom="space0">
      —
      <Anchor href="https://www.goodreads.com/book/show/60932.Parable_of_the_Talents">Octavia Butler</Anchor>
    </Paragraph>
  </Card>
  
 );
};

export default CardBox;
