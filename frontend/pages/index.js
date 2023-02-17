import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          authService
            .login({
              username: values.usuario,
              password: values.senha,
            })
            .then(() => {
              router.push("/auth-ssr");
              // router.push("/auth-static");
            })
            .catch((e) => {
              console.log(e);
              alert("usuário ou senha inválidos");
            });
        }}
      >
        <input
          placeholder="Usuário"
          name="usuario"
          defaultValue={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          defaultValue={values.senha}
          onChange={handleChange}
        />
        <p>
          <a href="/auth-ssr">ssr</a>
          <a href="/auth-static">static</a>
        </p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
