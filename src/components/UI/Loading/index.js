import styles from "./index.module.scss";
import LoaderGif from "p/img/loader.gif";

const Index = ({ isLoad }) => {
  return (
    <>
      {isLoad && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <img src={LoaderGif.src} alt="loader" />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
