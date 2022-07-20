import type {NextPage} from 'next'
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <>
            <p>Hello: Go and see the pages in:</p>
            <Link href="/ssr">
                <a>Server Side Rendered Content</a>
            </Link>
            <br/>
            <Link href="/static">
                <a>Static Generated Content</a>
            </Link>
        </>
    )
}

export default Home
