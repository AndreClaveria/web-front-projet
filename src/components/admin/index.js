import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import Presentation from "p/img/admin.jpg";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <Title title="Coté adminstrateur" Level="h1" />
        <div className={styles.container1}>
          <img src={Presentation.src} alt="prez" />
        </div>
      </div>
      <div className={styles.searchContainer}>
        <Button
          type="submit"
          title="Utilisateurs"
          btn="btn"
          className="btn__primary"
          handleClick={() => router.push("/admin/users")}
        />
        <Button
          type="submit"
          title="Missions"
          btn="btn"
          className="btn__primary"
        />
        <Button
          type="submit"
          title="Skills"
          btn="btn"
          className="btn__primary"
        />
        <Button
          type="submit"
          title="Proposition"
          btn="btn"
          className="btn__primary"
        />
      </div>
    </>
  );
};

export default Index;
