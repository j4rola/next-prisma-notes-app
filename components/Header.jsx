import Button from 'react-bootstrap/Button'; 
import Link from 'next/link'; 

function Header() {
  return (
    <div className='d-flex flex-column align-items-center p-5'><h1>Tabbed Notes</h1><h5 className='text-center'>A simple CRUD application to keep track of things.</h5><p>Built with Next.js, Prisma, and CockroachDb</p>  
    <Link href="https://github.com/j4rola/next-prisma-notes-app"><Button>See the Code</Button></Link></div>
  )
}

export default Header