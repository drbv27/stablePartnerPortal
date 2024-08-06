import { redirect } from 'next/navigation'

function HomePage() {
  redirect('/login')
}

export default HomePage;
