import Head from 'next/head';
 
function IframePage() {
  return (
    <div>
      <Head>
        <title>iFrame Integration in Next.js</title>
      </Head>
      <h1>YouTube Video Embed</h1>
      {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube video
        width="560"
        height="315"
        style={{ border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
 
export default IframePage;