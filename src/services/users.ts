import type { UserProps } from "../types/users";

const host = import.meta.env.VITE_HOST;

export async function getUsers(): Promise<UserProps[] | undefined> {
  try {
    const response = await fetch(`${host}/users/`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser({
  id,
}: {
  id: number;
}): Promise<UserProps | undefined> {
  try {
    const response = await fetch(`${host}/users/${id}`);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser({
  data,
}: {
  data: { name: string; email: string; password: string };
}) {
  try {
    const response = await fetch(`${host}/users/`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
