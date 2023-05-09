import { createContext, useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";

const UserContext = createContext({
  isLogged: false,
  user: {},
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState({});

  const [token, setToken] = useState();

  const [isLogged, setIsLogged] = useState(false);

  const { data, error, loading, fetchData } = useFetch({
    url: "/api/v1/user",
    method: "GET",
    body: null,
    token: token,
  });

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isLogged) {
      setToken(token);
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data && data.success) {
      login(data.user);
    }
  }, [data]);

  const login = (data) => {
    setUser(data);
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    setUser({});
    localStorage.removeItem("token");
    router.push("/", undefined, { shallow: false });
  };

  const updateUser = (data) => {
    setUser(data);
  };

  const context = useMemo(
    () => ({
      login,
      logout,
      user,
      isLogged,
      updateUser,
    }),
    [login, logout, user, isLogged, updateUser]
  );

  useEffect(() => {
    if (isMountedRef.current) {
      console.log("user conx : ", user);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
