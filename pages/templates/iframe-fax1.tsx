import Head from 'next/head';
 
function IframePageFax1() {
  return (
    <div>
      <Head>
        <title>Connie Webform Builder</title>
      </Head>
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe
        src="https://d2k4o22g5zxquf.cloudfront.net/assets/fax-covers/connie-test-fax-1page.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', minHeight: '900px', minWidth:'600px' }}
      />
    </div>
  );
}
 
export default IframePageFax1;