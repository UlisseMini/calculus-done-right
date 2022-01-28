import fs from "fs/promises";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import HomeAnimation from "../components/HomeAnimation";
import Layout from "../components/Layout";

const Home: NextPage = ({ pages }: any) => {
  return (
    <Layout>
      <h1>Calculus Done Right</h1>
      <p>
        An interactive calculus textbook and course. Currently under
        construction
      </p>
      <p>
        Join our{" "}
        <Link href="https://discord.gg/N7Ka6tPjeR">
          <a>Discord</a>
        </Link>{" "}
        to hear about updates and get free calculus help!
      </p>
      {/* <p>Want to help make it a reality? fill out our 1 minute <Link href="/survey"><a>survey</a></Link></p> */}
      <HomeAnimation />
      <p>Here are some unfinished posts I{"'"}m using for testing</p>
      <ul>
        {pages.map((page: any, i: number) => (
          <li key={i}>
            <Link href={page.href}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const fileNames = await fs.readdir("pages/lesson");

  const pages = [];
  for (const fileName of fileNames) {
    const imports = await import(`pages/lesson/${fileName}`);
    const slug = fileName.replace(/\.mdx$/, "");
    pages.push({
      href: `/lesson/${slug}`,
      ...imports.meta,
    });
  }

  return { props: { pages } };
};

export default Home;
