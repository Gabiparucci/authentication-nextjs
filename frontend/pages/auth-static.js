import React from "react";
import { withSessionHOC } from "../src/services/auth/session";

function AuthPageStatic(props) {
  return (
    <div>
      <h1>Static</h1>
      <p>
        <a href="/logout">logout</a>
      </p>
      <pre>{JSON.stringify(props.session, null, 2)}</pre>
    </div>
  );
}
export default withSessionHOC(AuthPageStatic);
