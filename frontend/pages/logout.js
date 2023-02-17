import { useRouter } from "next/router";
import { useEffect } from "react";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import { tokenService } from "../src/services/auth/tokenService";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      HttpClient("/api/refresh", {
        method: "DELETE",
      });
      tokenService.delete();
      router.push("/");
    } catch (e) {
      alert(e);
    }
  });

  return <div>Você será redirecionado...</div>;
}
