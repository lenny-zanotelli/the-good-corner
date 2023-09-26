import styles from "@/styles/RecentAds.module.css";


import AdCard, { AdCardProps } from '../AdCard';

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      imgUrl: "/images/table.webp",
      price: 120,
      link: "/ads/table"
    },
    {
      title: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne"
    },
    {
      title: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche"
    },
    {
      title: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier"
    },
    {
      title: "Bougie",
      imgUrl: "/images/bougie.webp",
      price: 45,
      link: "/ads/bougie"
    },
    {
      title: "Porte-magazine",
      imgUrl: "/images/porte-magazine.webp",
      price: 900,
      link: "/ads/porte-magazine"
    }


  ]
  return (
    <>
    <h2>Annonces récentes</h2>
    <section className={styles.recentAds}>
      {ads.map((ad) => (
        <AdCard
        key={ad.title}
        imgUrl={ad.imgUrl}
        link={ad.link}
        price={ad.price}
        title={ad.title} 
        />
      ))}
    </section>
    </>
  )
}

export default RecentAds;