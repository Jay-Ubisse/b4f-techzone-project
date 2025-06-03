import { Footer } from "@/components/footer";
import { UserRegisterForm } from "@/components/forms/register-user";
import { Header } from "@/components/header";

export const RegisterUser = () => {
  return (
    <>
      <Header />
      <main className="py-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5 text-cyan-800 font-semibold">
          Registrar usuário
        </h1>
        <UserRegisterForm />
      </main>
      <Footer />
    </>
  );
};
