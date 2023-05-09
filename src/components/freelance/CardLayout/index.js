import styles from "./index.module.scss";
import FreelanceCard from "@/components/freelance/Card";

const Index = ({ freelances }) => {
  console.log(freelances, "props freelance");
  return (
    <div className={styles.wrapper}>
      {freelances &&
        freelances.map((freelance) => (
          <FreelanceCard key={freelance.id} freelance={freelance} />
        ))}
    </div>
  );
};

export default Index;
