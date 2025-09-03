
import UserDetails from "@/components/UserDetails"
import { notFound } from "next/navigation"

export default async function UserDetailsPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, { cache: "no-store" })
  if (!res.ok) notFound()

  const user = await res.json()

  return <UserDetails user={user} />
}
