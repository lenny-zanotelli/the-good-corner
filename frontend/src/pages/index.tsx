import Header from "@/components/Header";
import RecentAds from "@/components/RecentAds";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <body>
        <main className={styles.mainContent}>
          <Header />
          <RecentAds />
        </main>
      </body>
    </>
    );
};
