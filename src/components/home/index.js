import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import Presentation from "p/img/presentation.jpg";
const Index = () => {
  return (
    <>
      <div className={styles.container}>
        <Title
          title="Hubhold, la plateforme d'entraide entre freelance et entreprise"
          Level="h1"
        />
      </div>
      <div className={styles.container1}>
        <img src={Presentation.src} alt="prez" />
      </div>
      
    </>
  );
};

export default Index;
