import Users from "@/components/Users";

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  company: Company;
};

export default async function Home() {
  // Fetch data directly in the server component
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await res.json();

  return (
    <div className="px-2 md:px-12 min-h-screen">
      <Users users={users} />
    </div>
  );
}

