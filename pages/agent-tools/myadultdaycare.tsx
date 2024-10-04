import Head from 'next/head';
 
function MyAdultDaycare() {
  return (
    <div>
      <Head>
        <title>Connie Webform Builder</title>
      </Head>
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe
        src="https://staging.myadulthomecare.com/staff_login/884ab270fea2c9fa5e648de498ad5911SHViU3BvdF9Vc2Vy726f549615f703f815cd0df26aff6cc1TnZjcm1AMDA3b3c27e8d6149175d06c2307d1333f3b4MTIzLTQ1Ni03ODkw"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden', minHeight: '900px', minWidth:'600px' }}
      />
    </div>
  );
}
 
export default MyAdultDaycare;