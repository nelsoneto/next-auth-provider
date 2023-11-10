import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <section className="flex  items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center">
        <h2 className="m-[1rem] mb-12 font-extrabold text-[30px]">Dashboard</h2>
        <div className="flex">
          <div className="">
            {session.user.image && (
              <Image
                className=" rounded-full w-[70px]"
                src={session?.user?.image}
                width="200"
                height="200"
                alt="user avatar"
              />
            )}
          </div>
          <div className="flex flex-col ml-6 justify-center  text-white">
            <h2 className="font-semibold">{session?.user?.name}</h2>
            <p> {session.user.email}</p>
          </div>
        </div>
        <button
          className="font-extrabold mt-5 bg-blue-700 hover:bg-blue-500 text-white w-[85px] h-[35px] rounded-lg"
          onClick={() => signOut()}
        >
          Sair
        </button>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
