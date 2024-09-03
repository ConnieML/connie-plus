import Head from 'next/head';
 
function IframePage() {
  return (
    <div>
      <Head>
        <title>Connie Webform Builder</title>
      </Head>
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe
        src="https://analytics.ytica.com/dashboard.html#workspace=/gdc/workspaces/j96z6oel60zvz2xd0rljovzhjeqkipya&dashboard=/gdc/md/j96z6oel60zvz2xd0rljovzhjeqkipya/obj/41972"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', minHeight: '900px', minWidth:'600px' }}
      />
    </div>
  );
}
 
export default IframePage;