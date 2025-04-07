import Head from 'next/head';
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import { Anchor } from "@twilio-paste/core/anchor";
 
function IframeEmbedFax1() {
  return (
    <div>
      <Head>
        <title>Connie Webform Builder</title>
      </Head>
      <Paragraph>
      Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe
        src="https://airtable.com/embed/shrVTU8uyYD6nXuuq?backgroundColor=blue&layout=card&viewControls=on"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', minHeight: '900px', minWidth:'600px' }}
      />
    </div>
  );
}
 
export default IframeEmbedFax1;