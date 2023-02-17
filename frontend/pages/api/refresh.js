import nookies from "nookies";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";
import { tokenService } from "../../src/services/auth/tokenService";

const REFRESH_TOKEN_NAME = "REFRESH_TOKEN_NAME";
const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res };

    nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.json({
      data: {
        message: "teste",
      },
    });
  },

  async displayCookies(req, res) {
    const ctx = { req, res };
    res.json({
      data: {
        cookies: nookies.get(ctx),
      },
    });
  },

  async regenerateToken(req, res) {
    const ctx = { req, res };
    const cookies = nookies.get(ctx);
    const refresh_token = cookies[REFRESH_TOKEN_NAME] || req.body.refresh_token;
    const refreshRespose = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`,
      {
        method: "POST",
        body: {
          refresh_token,
        },
      }
    );
    if (refreshRespose.ok) {
      nookies.set(
        ctx,
        REFRESH_TOKEN_NAME,
        refreshRespose.body.data.refresh_token,
        {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        }
      );

      tokenService.save(refreshRespose.body.data.access_token, ctx);

      res.status(200).json({
        data: refreshRespose.body.data,
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "não autorizado",
      });
    }
  },
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateToken,
  PUT: controllers.regenerateToken,
  DELETE: (req, res) => {
    const ctx = { req, res };
    nookies.destroy(ctx, REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return res.json({
      data: {
        message: "deleted with success",
      },
    });
  },
  // GET: controllers.displayCookies,
};

export default function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);
  res.status(404).json({
    status: 404,
    message: "not found",
  });
}
