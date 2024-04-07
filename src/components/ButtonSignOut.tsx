import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
  return (
    <>
      <button onClick={() => signOut()} className='bg-red-600 hover:bg-red-800 font-bold py-2 px-4 rounded text-white'>
        Cerrar sesión
      </button>
    </>
  );
}
