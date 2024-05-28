import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { instance } from "~/utils/axios";
import Link from "next/link";

type SigningPhase = "sign-in" | "sign-up" | "forget-pw" | "confirming";

export default function Auth() {
  const [signingPhase, setSigningPhase] = useState<SigningPhase>("sign-in");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const register = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const requestBody = {
        query: `
                  mutation Mutation($email: String!, $password: String!, $firstName: String!) {
                    signup(email: $email, password: $password, firstName: $firstName) {
                      code
                      isNewUser
                      message
                      success
                      token
                      user {
                        email
                        firstName
                      }
                    }
                  }
              `,
        variables: {
          email,
          password,
          firstName,
        },
      };
      const res = await instance.post("/graphql", requestBody);
      if (res.data.errors) {
        alert(res.data.errors[0].message);
        return;
      }
      alert("User created successfully, redirecting to dashboard");
      setTimeout(() => {
        login();
      }, 1000);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const login = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  const forgetPw = async () => {
    try {
      const requestBody = {
        query: `
          mutation Mutation($email: String!) {
            sendPasswordResetEmail(email: $email)
          }
        `,
        variables: {
          email,
        },
      };
      const res = await instance.post("/graphql", requestBody);
      if (res.data.errors) {
        alert(res.data.errors[0].message);
        return;
      }
      alert("Password reset informations sent to your email");
      setSigningPhase("confirming");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const confirmPwReset = async () => {
    try {
      const requestBody = {
        query: `
        mutation Mutation($newPassword: String!, $email: String!, $code: String!) {
          resetPassword(newPassword: $newPassword, email: $email, code: $code)
        }
        `,
        variables: {
          email,
          newPassword: password,
          code: resetCode,
        },
      };
      const res = await instance.post("/graphql", requestBody);
      if (res.data.errors) {
        alert(res.data.errors[0].message);
        return;
      }
      alert("Password reset successfully");
      setPassword(newPassword);
      setSigningPhase("sign-in");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const userAuthHandler = {
    "sign-in": login,
    "sign-up": register,
    "forget-pw": forgetPw,
    confirming: confirmPwReset,
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Link
        className="absolute left-4 top-4 mt-2 border-b border-white px-2 py-1 text-white transition-colors duration-300 ease-in-out"
        href="/"
      >
        Return to Dashboard
      </Link>

      <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
        <form
          className="w-full max-w-md"
          onSubmit={async (e) => {
            e.preventDefault();
            await userAuthHandler[signingPhase]();
          }}
        >
          <div className="mx-auto flex justify-center">
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Go Linguistic!
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSigningPhase("sign-in");
              }}
              disabled={signingPhase === "confirming"}
              className={`w-1/3 border-b-2 pb-4 text-center font-medium capitalize text-gray-500  dark:text-gray-300 ${signingPhase === "sign-in" ? "border-blue-500 dark:border-blue-400 " : "dark:border-gray-400"}`}
            >
              sign in
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setSigningPhase("sign-up");
              }}
              disabled={signingPhase === "confirming"}
              className={`w-1/3 border-b-2 pb-4 text-center font-medium capitalize text-gray-500 dark:text-white ${signingPhase === "sign-up" ? "border-blue-500 dark:border-blue-400 " : "dark:border-gray-400"}`}
            >
              sign up
            </button>
          </div>

          {signingPhase === "sign-up" && (
            <div className="relative mt-8 flex items-center">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          )}

          {/* <label
            htmlFor="dropzone-file"
            className="mx-auto mt-6 flex cursor-pointer items-center rounded-lg border-2 border-dashed bg-white px-3 py-3 text-center dark:border-gray-600 dark:bg-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <h2 className="mx-3 text-gray-400">Profile Photo</h2>

            <input id="dropzone-file" type="file" className="hidden" />
          </label> */}

          <div className="relative mt-6 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              value={email}
              className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {signingPhase !== "forget-pw" && signingPhase !== "confirming" && (
            <div className="relative mt-4 flex items-center">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                value={password}
                className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {signingPhase === "confirming" && (
            <div className="relative mt-4 flex items-center">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="text"
                value={resetCode}
                className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="Reset Code"
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </div>
          )}

          {signingPhase === "confirming" && (
            <div className="relative mt-4 flex items-center">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                value={newPassword}
                className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}

          {signingPhase === "sign-up" && (
            <div className="relative mt-4 flex items-center">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-3 h-6 w-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                className="block w-full rounded-lg border bg-white px-10 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {signingPhase === "sign-in" && "Sign In"}
              {signingPhase === "sign-up" && "Sign Up"}
              {signingPhase === "forget-pw" && "Request Password Reset"}
              {signingPhase === "confirming" && "Confirm Password Reset"}
            </button>

            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <button
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                onClick={(e) => {
                  e.preventDefault();
                  setSigningPhase((prev) =>
                    prev === "sign-in" ? "sign-up" : "sign-in",
                  );
                }}
              >
                {signingPhase === "sign-in" && "Don't have an account?"}
                {signingPhase === "sign-up" && "Already have an account?"}
                {signingPhase === "confirming" && "Change your mind?"}
              </button>
              {signingPhase === "sign-in" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSigningPhase("forget-pw");
                  }}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
