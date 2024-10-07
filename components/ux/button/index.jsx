import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div className="text-black">
      Not signed in <br />
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in
      </button>
    </div>
  );
};

export default AuthButton;
