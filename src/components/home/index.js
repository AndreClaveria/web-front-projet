import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import Presentation from "p/img/presentation.jpg";
import SearchBar from "@/components/UI/SearchBar";

const Index = () => {
  return (
    <>
      <div className={styles.container}>
        <Title
          title="Hubhold, la plateforme d'entraide entre freelance et entreprise"
          Level="h1"
        />
        <div className={styles.container1}>
          <img src={Presentation.src} alt="prez" />
        </div>
      </div>
      <div className={styles.searchContainer}>
        <SearchBar
          placeholder="Chercher freelance par compétences"
          value=""
          onChange={() => {}}
        />
        <SearchBar
          placeholder="Chercher freelance par ville"
          value=""
          onChange={() => {}}
        />
      </div>
    </>
  );
};

export default Index;
