import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { UsersTable } from "@/components/users-table";
import { Navigate } from "react-router-dom";

export const Community = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />

      <main className="py-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5 text-cyan-800 font-semibold">
          Usuários da comunidade
        </h1>
        <UsersTable />
      </main>
      <Footer />
    </>
  );
};
