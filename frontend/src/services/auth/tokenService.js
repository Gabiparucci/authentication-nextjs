import nookies from "nookies";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN_NAME = "REFRESH_TOKEN_NAME";
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken, ctx = null) {
    // globalThis?.localStorage?.setItem("ACCESS_TOKEN", accessToken);
    nookies.set(ctx, ACCESS_TOKEN, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },

  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN];
    // globalThis?.localStorage?.getItem("ACCESS_TOKEN");
  },
  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN);
    nookies.destroy(ctx, ACCESS_TOKEN);
  },
};
