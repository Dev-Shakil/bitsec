import UserDetails from "@/components/UserDetails"
import { notFound } from "next/navigation"

// User type
interface User {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) notFound()

  const user: User = await res.json()

  return <UserDetails user={user} />
}




