import styles from "./index.module.scss";
import Link from "next/link";

const Index = ({ freelance }) => {
  console.log(freelance, "props freelance");
  return (
    <Link href={`/shop/${freelance._id}`} className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <img src={freelance.thumbnail} alt={freelance.name} />
      </div>
      <div className={styles.content}>
        <p>{freelance.name}</p>
        <p>{freelance.price} €</p>
      </div>
    </Link>
  );
};

export default Index;
