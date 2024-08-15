import Head from 'next/head';
 
function TestData() {
  return (
    <div>
      <Head>
        <title>iFrame Integration in Next.js</title>
      </Head>
      <h1>YouTube Video Embed</h1>
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe frameborder="0" src="https://analytics.ytica.com/dashboard.html#workspace=/gdc/workspaces/j96z6oel60zvz2xd0rljovzhjeqkipya&dashboard=/gdc/md/j96z6oel60zvz2xd0rljovzhjeqkipya/obj/2650" width="100%" height="1610px" allowTransparency="false" />
    </div>
  );
}
 
export default TestData;