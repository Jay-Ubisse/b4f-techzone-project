import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/services/users";
import type { UserProps } from "@/types/users";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";

export const UsersTable = () => {
  const [users, setUsers] = useState<UserProps[] | undefined>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }

    fetchUsers();
  });

  if (!users) {
    return <div>Nenhum usuário encontrado</div>;
  }

  return (
    <Table className="max-w-xl mx-auto">
      <TableCaption>Lista dos usuários da plataforma.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <Button
                className="flex gap-2 items-center bg-cyan-800 text-white"
                size={"sm"}
              >
                <Info />
                <span>Ver Detalhes</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total de usuários</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
