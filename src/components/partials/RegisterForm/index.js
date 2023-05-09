import { useState } from "react";
import Input from "@/components/UI/Input";
import useFetch from "@/hooks/useFetch";
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import { useRouter } from "next/router";
import Loading from "@/components/UI/Loading";
import Select from "@/components/UI/Select";
import styles from "./index.module.scss";
const Index = () => {
  const router = useRouter();

  const [clickError, setClickError] = useState(false);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAdmin: "false",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    password: "",
    userType: "FREELANCE",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/api/v1/auth/register",
    method: "POST",
    body: userForm,
    token: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userType") {
      setUserForm({
        ...userForm,
        [name]: value === "FREELANCE" ? "FREELANCE" : "COMPANY",
      });
    } else if (name.startsWith("address.")) {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
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

  const submitRegister = async (e) => {
    e.preventDefault();

    const response = await fetchData();
    console.log(userForm);
    console.log("reponse : ", response);
    console.log("data : ", data);

    if (data && data.success) {
      setClickError(false);
      console.log("data : ", data);
      console.log(data.token);
      localStorage.setItem("token", data.token);

      if (userForm.userType === "FREELANCE") {
        router.push("register/freelance", undefined, { shallow: false });
      } else if (userForm.userType === "COMPANY") {
        console.log(data.token);
        router.push("register/company", undefined, { shallow: false });
      }
    } else {
      setClickError(true);
    }
  };

  if (error) {
    error.message = error.message;
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form__wrapper}>
          <Loading isLoad={loading} />
          <Title title="Inscription" Level="h1" />
          <form onSubmit={(e) => submitRegister(e)}>
            <Input
              label="Firstname"
              type="firstName"
              name="firstName"
              placeholder="veuillez saisir votre prénom"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.firstName}
            />

            <Input
              label="Lastname"
              type="lastName"
              name="lastName"
              placeholder="veuillez saisir votre nom"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.lastName}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="veuillez saisir votre email"
              required={true}
              onChange={(e) => handleChange(e)}
              value={userForm.email}
              autoComplete="username"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="veuillez saisir votre mot de passe"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm.password}
              autocomplete="current-password"
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
            <Select
              label="FREELANCE or COMPANY"
              name="userType"
              value={userForm.userType}
              isRequired={true}
              options={[
                { label: "FREELANCE", value: "FREELANCE" },
                { label: "COMPANY", value: "COMPANY" },
              ]}
              onChange={(e) => handleChange(e)}
            />

            <Button
              type="submit"
              title="S'inscrire"
              btn="btn"
              className="btn__secondary"
              handleClick={(e) => submitRegister(e)}
            />
          </form>
          {error && <Notification type="warning" message={error.message} />}
        </div>
      </div>
    </>
  );
};

export default Index;
