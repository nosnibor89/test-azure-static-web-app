import type {GetServerSideProps, NextPage} from 'next'
import Image from "next/image";
import Link from "next/link";

interface ServerSideRenderedProps {
    programs: any[]
}

const ServerSideRendered: NextPage<ServerSideRenderedProps> = ({programs}) => {
    return (
        <>
            <h2>The programs:</h2>
            {programs.map(p => {
                return (
                    <div key={p.id} style={{width: '50%'}}>
                        <h4><Link href={`/ssr/${encodeURIComponent(p.name)}`}>
                            <a style={{color: "blue"}}>{p.name}</a>
                        </Link></h4>
                        <p>{p.description}</p>
                        <Image src={`https:${p.image}`} width={50}
                               height={50}/>
                    </div>
                )
            })}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    console.log(`[INFO]: fetching programs`)
    const response = await fetch('https://test-backend-nextjs.azurewebsites.net/api/entries')
    const entries = await response.json()

    const programs = entries.items.map((item: any) => {
        const program = {
            id: item.sys.id,
            name: item.fields.name,
            description: item.fields.description,
            image: item.fields.image.fields.file.url
        }

        return program
    })


    return {
        props: {programs}
    }

}

export default ServerSideRendered
