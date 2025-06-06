import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import type { UserProps } from "@/types/users";
import { LogOut } from "lucide-react";

const linkStyles = "hover:text-cyan-300";

export const Header = () => {
  const token = localStorage.getItem("token");
  let session: UserProps = { email: "", id: "", name: "" };

  if (token) {
    session = JSON.parse(localStorage.getItem("session")!);
  }

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-cyan-900 px-20 py-10 text-white flex justify-between">
      <h1 className="text-2xl font-bold text-cinha-200">B4F TechZone </h1>
      <div className="flex items-center gap-16">
        <nav className="space-x-8 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? "text-cyan-300" : ""}`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? "text-cyan-300" : ""}`
            }
          >
            Cursos
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? "text-cyan-300" : ""}`
            }
          >
            Comunidade
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? "text-cyan-300" : ""}`
            }
          >
            Sobre
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkStyles} ${isActive ? "text-cyan-300" : ""}`
            }
          >
            Contacto
          </NavLink>
        </nav>
        {token ? (
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">{session.name}</p>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              size={"icon"}
              className="bg-white text-cyan-800"
            >
              <LogOut size={24} />
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to={"/login"}>Iniciar sessão</Link>
            <Link to="/register">
              <Button
                size={"sm"}
                className="bg-white rounded-md text-cyan-600 px-4 py-2 font-medium"
              >
                Registrar-se
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
