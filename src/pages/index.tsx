import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <main>
      <h1>Guestbook</h1>

      <button onClick={() => signIn("discord")}>Login with Discord</button>
    </main>
  );
};

export default Home;
