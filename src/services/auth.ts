const host = import.meta.env.VITE_HOST;

export async function login({
  data,
}: {
  data: { email: string; password: string };
}) {
  try {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
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
