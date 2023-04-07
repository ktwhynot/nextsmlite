import Link from 'next/link';

const Home = () => {
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <h1>The Home Page</h1>
      <div>
        <Link href={"/account"}>Account Page</Link>
      </div>
      <div>
        <Link href={"/wall"}>Message Wall</Link>
      </div>
    </div>
  )
}

export default Home