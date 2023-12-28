import { appLabels } from '@/app/app-constants'
import Link from 'next/link'

const Navbar = () => {
  return (
    <Link data-testid="app-title" className="text-2xl cursor-pointer" href="/">
      {appLabels.APP_TITLE}
    </Link>
  )
}

export default Navbar
