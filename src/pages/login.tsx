import { Footer } from "@/components/footer";
import { LoginForm } from "@/components/forms/login";
import { Header } from "@/components/header";

export const Login = () => {
  return (
    <>
      <Header />
      <main className="py-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5 text-cyan-800 font-semibold">Entrar</h1>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};
