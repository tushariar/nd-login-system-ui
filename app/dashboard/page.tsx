"use server";

export default async function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Welcome</h1>
        <p>You have logged in successfully!</p>
      </div>
    </main>
  )
}
