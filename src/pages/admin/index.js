import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import Presentation from "@/components/admin";

const Index = () => {
  const router = useRouter();
  const { isLogged, user } = useContext(UserContext);
  const [token, setToken] = useState();

  useEffect(() => {
    if (!user._id) {
      // User object is empty, so return and wait for it to be set
      return;
    }

    if (!user.isAdmin) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isLogged) {
      setToken(token);
    }
  }, [token]);
  return (
    <>
      <Presentation />
    </>
  );
};

export default Index;
