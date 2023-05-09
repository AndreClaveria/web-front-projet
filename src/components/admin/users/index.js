import useFetch from "@/hooks/useFetch";
import React from "react";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import Loading from "@/components/UI/Loading";
import { useContext } from "react";
const Index = () => {
  const { user, isLogged, logout } = useContext(UserContext);
  const [token, setToken] = useState();
  const [users, setUsers] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : ", localStorage.getItem("token"));
    if (token) {
      setToken(token);
    }
  }, []);

  console.log("token : ", token);
  const { fetchData, data, error, loading } = useFetch({
    url: "/api/v1/user/admin/users",
    method: "GET",
    body: null,
    token: token,
  });

  useEffect(() => {
    console.log("data : ", data);
    setUsers(data);
    if (users == {}) {
      return;
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  //commenter la ligne suivante pour faire marcher le tableau
  if (data === {} || Object.keys(data).length === 0) {
    return;
  }
  return (
    <>
      <Loading isLoad={loading} />
      <table className={styles.tab}>
        <Loading isLoad={loading} />
        <thead>
          <tr>
            <th className={styles.tabl}>First Name</th>
            <th className={styles.tabl}>Last Name</th>
            <th className={styles.tabl}>Email</th>
            <th className={styles.tabl}>Phone</th>

            <th className={styles.tabl}>Street</th>
            <th className={styles.tabl}>Zip Code</th>
            <th className={styles.tabl}>City</th>

            <th className={styles.tabl}>User Type</th>
          </tr>
        </thead>
        <tbody className={styles.tab}>
          {data &&
            data.success &&
            data.users.map((user) => (
              <>
                <Loading isLoad={loading} />
                <tr key={user._id} className={styles.tabl}>
                  <td className={styles.tabl}>{user.firstName}</td>
                  <td className={styles.tabl}>{user.lastName}</td>
                  <td className={styles.tabl}>{user.email}</td>
                  <td className={styles.tabl}>{user.phone}</td>

                  <td className={styles.tabl}>{user.address.street}</td>
                  <td className={styles.tabl}>{user.address.zipCode}</td>
                  <td className={styles.tabl}>{user.address.city}</td>

                  <td className={styles.tabl}>{user.userType}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;
