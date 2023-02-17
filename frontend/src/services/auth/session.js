import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authService } from "./authService";

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((resp) => {
        setSession(resp);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: session,
    error,
    loading,
  };
}

export function withSessionHOC(Component) {
  return (props) => {
    const { loading, error, data } = useSession();
    const router = useRouter();

    if (error && !loading) {
      router.push("/?error=401");
    }
    const newProps = {
      ...props,
      session: data,
    };

    return <Component {...newProps} />;
  };
}

export function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);

      const fullCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return funcao(fullCtx);
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}
