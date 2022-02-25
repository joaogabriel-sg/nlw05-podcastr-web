import { GetStaticProps } from "next";
import Head from "next/head";

export default function Home({ episodes }) {
  return (
    <div>
      <Head>
        <title>Podcastr</title>
      </Head>

      <h1>Hello World</h1>

      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
