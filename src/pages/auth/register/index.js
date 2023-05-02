import Button from "@/components/UI/Button";
import user from "p/img/user.png";
// import freelance from "p/img/freelance.png";
import styles from "./index.module.scss";
import Link from "next/link";
import { useState } from "react";
import RegisterForm from "@/components/partials/RegisterForm";
import Modal from "@/components/UI/Modal";
const Index = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div>Crée un compte</div>
      </div>
      <Button
        image={user.src}
        type="submit"
        title="CRÉER UN COMPTE"
        handleClick={handleButtonClick}
        btn="register"
        className="register__primary"
      />

      <div className={styles.login}>
        <p>
          Vous avez déjà un compte ?{" "}
          <Link href="/auth/login">Connectez-vous ?</Link>
        </p>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <RegisterForm />
        </Modal>
      )}
    </>
  );
};

export default Index;
