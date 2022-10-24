import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
//import { LangSwitcher } from "../../components/lang-switcher/index.mjs"
import { getText } from '../../locales/index.mjs';
import { useRouter } from "next/router";

const Messages = () => {
  const { locale } = useRouter();
  const textFetch = getText(locale, 'fetching');
  const { data: messages, isLoading } = trpc.useQuery(["guestbook.getAll"]);

  if (isLoading) return <div>{textFetch}</div>;

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const { locale } = useRouter();
  const textTitle = getText(locale, 'title');
  const textLoad = getText(locale, 'loading');
  const textHi = getText(locale, 'hi');
  const textLogout = getText(locale, 'logout');
  const textYourMessage = getText(locale, 'yourmessage');
  const textSubmit = getText(locale, 'submit');
  const textLogin = getText(locale, 'discord');
  {/*const destPage = '';*/}
  const ctx = trpc.useContext();
  const postMessage = trpc.useMutation("guestbook.postMessage", {
    onMutate: () => {
      ctx.cancelQuery(["guestbook.getAll"]);

      let optimisticUpdate = ctx.getQueryData(["guestbook.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["guestbook.getAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["guestbook.getAll"]);
    },
  });

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">{textLoad}</main>;
  }

  return (
    <>
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Guestbook</h1>
      <p>{textTitle}</p>

      <div className="pt-10">
        {session ? (
          <div>
            <p>{textHi} {session.user?.name}</p>

              <button onClick={() => signOut()}>{textLogout}</button>

            <div className="pt-6">
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();

                  postMessage.mutate({
                    name: session.user?.name as string,
                    message,
                  });

                  setMessage("");
                }}
              >
                <input
                  type="text"
                  value={message}
                  placeholder="{textYourMessage}"
                  minLength={2}
                  maxLength={100}
                  onChange={(event) => setMessage(event.target.value)}
                  className="px-4 py-2 rounded-md border-2 border-zinc-800 bg-neutral-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 rounded-md border-2 border-zinc-800 focus:outline-none"
                >
                  {textSubmit}
                </button>
              </form>
            </div>

            <div className="pt-10">
              <Messages />
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => signIn("discord")}>
              {textLogin}
            </button>

            <div className="pt-10" />
            <Messages />
          </div>
        )}
      </div>
    </main>
    {/*<LangSwitcher redirectTo={`${destPage}`} />*/}
    </>
  );
};

export default Home;