"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { createUser } from "@/services/users";

const FormSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z
      .string({ required_error: "O email é obrigatório" })
      .email("Email inválido"),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(20, "A senha deve ter no máximo 20 caracteres"),
    confirmPassword: z.string({ required_error: "A senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "A palavra-passe não é a mesma",
  });

export function UserRegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast.loading("Criando usuário", { id: "1" });
      const response = await createUser({ data });
      const userData = await response?.json();

      if (response?.status === 201) {
        toast.success(userData.message, { id: "1" });
      } else {
        toast.error(userData.message, { id: "1" });
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao criar usuário", { id: "1" });
      console.log(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registre-se na nossa plataforma</CardTitle>
        <CardDescription>
          Introduza os seus dados para criar a conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Introduza o email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavra-Passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Introduza a sua palavra-passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Palavra-passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme a usa palavra-passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-fit ml-auto mt-4">
              <Button type="submit">Registrar-me</Button>
            </div>
          </form>
        </Form>
        <CardAction>
          <p>
            Já tem uma conta?{" "}
            <Link to={"#"} className="underline underline-offset-1">
              Inicie Sessão
            </Link>
          </p>
        </CardAction>
      </CardContent>
    </Card>
  );
}
