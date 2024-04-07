import { signIn } from "next-auth/react";

export default function ButtonGithub() {
  return (
    <>
      <button onClick={() => signIn("github", { redirect: false })} className='bg-violet-900 hover:bg-violet-700 font-bold py-2 px-4 rounded text-white'>
        Login Github
      </button>
    </>
  );
}
