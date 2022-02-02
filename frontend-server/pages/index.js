import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <header className="main-header">
        <section>
          <h1>10<i>ki</i></h1>
          <sub>(天気は)</sub>
        </section>
        <hr />
        <section>
          <h2>Weather Forecast</h2>
        </section>
      </header>
    </>
  );
}
