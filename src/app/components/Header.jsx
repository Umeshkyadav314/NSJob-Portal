import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();
  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl rounded-md bg-red-600 p-2">
          NSJob Portal
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link
              className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 hover:bg-gray-500 hover:text-white "
              href={signInUrl}
            >
              Login
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 hover:bg-gray-500 hover:text-white"
              >
                Logout
              </button>
            </form>
          )}
          <Link
            className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-500 text-white hover:bg-blue-700"
            href={"/new-listing"}
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}
