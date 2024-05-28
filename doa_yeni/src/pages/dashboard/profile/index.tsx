import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DefaultLayout } from "~/components/layout/default";
import { getServerAuthSession } from "~/server/auth";
import { instance } from "~/utils/axios";

export default function Profile() {
  const { data } = useSession();

  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const pwChangeFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newPw !== confirmPw) {
        alert("Passwords do not match");
        return;
      }

      const requestBody = {
        query: `
                mutation Mutation($newPassword: String!) {
                  changePassword(newPassword: $newPassword)
                }
              `,
        variables: {
          newPassword: newPw,
        },
      };

      const res = await instance.post("/graphql", requestBody);

      alert(
        res.data.data.changePassword
          ? "Password changed"
          : "Failed to change password",
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <section className="container flex max-w-7xl items-start gap-12 rounded-lg bg-white px-4 py-6">
        <div className="flex divide-x">
          <div className="flex flex-col gap-4 px-5">
            <h2 className="text-2xl font-bold">Profile</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-600">First Name</label>
                <input
                  type="text"
                  value={data?.user?.userName}
                  className="rounded-md border border-gray-300 px-2 py-1"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  value={data?.user?.email!}
                  className="rounded-md border border-gray-300 px-2 py-1"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-5">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <form
              onSubmit={pwChangeFormHandler}
              className="flex flex-col gap-4"
            >
              <input
                type="password"
                placeholder="New Password"
                className="rounded-md border border-gray-300 px-2 py-1"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="rounded-md border border-gray-300 px-2 py-1"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-md border border-gray-300 bg-gray-900 px-2 py-1 text-white"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>

        {/* <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <form className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="rounded-md border border-gray-300 px-2 py-1"
            />
            <input
              type="password"
              placeholder="New Password"
              className="rounded-md border border-gray-300 px-2 py-1"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-md border border-gray-300 px-2 py-1"
            />
            <button
              type="submit"
              className="rounded-md border border-gray-300 bg-gray-900 px-2 py-1 text-white"
            >
              Change Password
            </button>
          </form>
        </div> */}
      </section>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)) as Session,
    },
  };
}
