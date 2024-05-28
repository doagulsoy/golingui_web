import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#02346d] to-[#15272c]">
      <header className="container flex w-full max-w-7xl items-center justify-between">
        <Link href="/dashboard" className="text-5xl font-bold text-white">
          Go Linguistic!
        </Link>
        <nav>
          <ul className="flex items-center gap-4 text-white">
            {session ? (
              <>
                <span className="text-white">
                  Welcome {session.user.userName},
                </span>
                <Link href="/dashboard/profile" className="text-white">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-md border border-white bg-[#02346d] px-2 py-1 text-white duration-200 hover:bg-[#15272c]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md border border-white bg-[#02346d] px-2 py-1 duration-200 hover:bg-[#15272c]"
                  href="/auth"
                >
                  Sign In
                </Link>
                <Link href="/auth">Sign Up</Link>
              </>
            )}
          </ul>
        </nav>
      </header>

      {children}
    </main>
  );
};
