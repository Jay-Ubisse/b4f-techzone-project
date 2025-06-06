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
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { login } from "@/services/auth";

const FormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .email("Email inválido"),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      toast.loading("Iniciando sessão", { id: "1" });
      const response = await login({
        data: { email: values.email, password: values.password },
      });

      const data = await response?.json();

      if (!response!.ok && response!.status === 401) {
        toast.error(data.message, { id: "1" });
      } else {
        const user = {
          id: data.user._id,
          email: data.user.email,
          name: data.user.name,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("session", JSON.stringify(user));

        toast.success(data.message, { id: "1" });
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao iniciar sessão", { id: "1" });
      console.log(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">
          Entre para a nossa comunidade e conheça o mundo infinito da tecnologia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <div className="w-fit ml-auto mt-4">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
        <CardAction>
          <p>
            Não tem uma conta?{" "}
            <Link to={"/register"} className="underline underline-offset-1">
              Registre-se
            </Link>
          </p>
        </CardAction>
      </CardContent>
    </Card>
  );
}
