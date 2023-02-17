import { withSession } from "../src/services/auth/session";

function AuthPageSSR(props) {
  return (
    <div>
      <h1>Server side</h1>
      <p>
        <a href="/logout">logout</a>
      </p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSSR;

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
