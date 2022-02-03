import LessonList from "components/LessonList";
import fs from "fs/promises";
import { importMeta, Meta } from "lib/lesson";
import { assert } from "lib/utils";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import HomeAnimation from "../components/HomeAnimation";
import Layout from "../components/Layout";

type Props = {
  pages: Meta[];
  children?: ReactNode;
};

const Home = ({ pages }: Props) => {
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
      <h2>Lessons</h2>
      <LessonList pages={pages} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fileNames = await fs.readdir("pages/lesson");

  const pages = [];
  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.mdx$/, "");
    const meta = await importMeta(slug);
    assert(() => slug === meta.slug, `${slug} !== ${meta.slug}`);
    pages.push(meta);
  }

  return { props: { pages } };
};

export default Home;
