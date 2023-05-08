import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
const Index = () => {
  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
    console.log(showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : ", localStorage.getItem("token"));
    if (token) {
      setToken(token);
    } else {
      router.push("/auth/register", undefined, { shallow: false });
    }
  }, []);

  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
  } = useFetch({
    url: "/api/v1/user",
    method: "PUT",
    body: userForm,
    token: token,
  });

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setShowModal(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

  if (loadingUpdate) return <Loading />;
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name.startsWith("freelance.")) {
      setUserForm({
        ...userForm,
        freelance: {
          ...userForm.freelance,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
    console.log("user : ", userForm);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setToken(token);
    fetchDataUpdate();
    if (dataUpdate.success) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className={styles.centered1}>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}>
              <Title title="Modifier son profile" Level="h1" />
              <div className={styles.flexContainer}>
                <Input
                  label="firstName"
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  isRequired={true}
                  placeholder="enter your firstName"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="lastName"
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  isRequired={true}
                  placeholder="enter your lastName"
                  onChange={(e) => handleChange(e)}
                />

                <Input
                  label="Phone"
                  type="phone"
                  name="phone"
                  placeholder="veuillez saisir votre téléphone"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.phone}
                />

                <Input
                  label="email"
                  type="text"
                  name="email"
                  value={userForm.email}
                  isRequired={true}
                  placeholder="enter your email"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Street"
                  type="text"
                  name="address.street"
                  placeholder="Enter your street address"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.street}
                />

                <Input
                  label="Zip Code"
                  type="text"
                  name="address.zipCode"
                  placeholder="Enter your zip code"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.zipCode}
                />

                <Input
                  label="City"
                  type="text"
                  name="address.city"
                  placeholder="Enter your city"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.city}
                />

                <Input
                  label="Rate"
                  type="text"
                  name="freelance.rate"
                  placeholder="Enter your rating"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.freelance.rate}
                />

                <Input
                  label="Year of Experience"
                  type="text"
                  name="freelance.yearOfExperience"
                  placeholder="Enter your year of experience"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.freelance.yearOfExperience}
                />

                <Button
                  type="submit"
                  title="modifier"
                  btn="btn"
                  className="btn__primary"
                />
              </div>
            </form>
          </Modal>
        )}

        {user && (
          <>
            <div className={styles.centered}>
              <p className={styles.flexItem}>
                Type d'utilisateur : <span> {user.userType}</span>
              </p>
              <div className={styles.flexContainer}>
                <p className={styles.flexItem}>
                  Rating : <span> {user.freelance?.rate} / 5</span>
                </p>
                <p className={styles.flexItem}>
                  Prénom : <span> {user.firstName}</span>
                </p>

                <p className={styles.flexItem}>
                  Nom de famille : <span> {user.lastName}</span>
                </p>

                <p className={styles.flexItem}>
                  Phone : <span> {user.phone}</span>
                </p>
                <p className={styles.flexItem}>
                  Email : <span> {user.email}</span>
                </p>
                <p className={styles.flexItem}>
                  Année d'expérience :{" "}
                  <span> {user.freelance?.yearOfExperience} ans</span>
                </p>

                <p className={styles.flexItem}>
                  Rue : <span> {user.address?.street}</span>
                </p>
                <p className={styles.flexItem}>
                  Code postal : <span> {user.address?.zipCode}</span>
                </p>
                <p className={styles.flexItem}>
                  Ville : <span> {user.address?.city}</span>
                </p>
              </div>
            </div>
          </>
        )}

        <Button
          title="modifier"
          btn="btn"
          className="btn__primary"
          type="button"
          handleClick={handleButtonClick}
        />
      </div>
    </>
  );
};

export default Index;
