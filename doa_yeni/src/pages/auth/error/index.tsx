import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();

  const error = router.query.error;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-indigo-950 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-2xl">An error occurred: {error}</p>
        <button
          className="mt-2 rounded-md border px-2 py-1 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
