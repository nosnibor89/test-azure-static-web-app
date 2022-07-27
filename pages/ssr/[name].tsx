import type {GetServerSideProps, NextPage} from 'next'
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

interface ServerSideRenderedProps {
    program: any
}

const ServerSideRenderedSingle: NextPage<ServerSideRenderedProps> = ({program}) => {
    const [showDescription, setShowDescription] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleRefresh = async () => {
        setIsLoading(true);
        const found = await findProgram(program.name);
        program = found
        setIsLoading(false);
    }

    return (
        <div style={{width: '50%'}}>
            <Link href={`/ssr`}>
                <a style={{color: "blue"}}>Go back</a>
            </Link><br/>
            <small>this button&apos;s purpose is to show dynamic behavior with NextJS</small><br/>
            <button
                onClick={() => setShowDescription(!showDescription)}>{showDescription ? 'Hide' : 'Show'} Description
            </button>
            <br/>

            <small>this button&apos;s purpose is to show we can still make AJAX call and have dynamic content
                rendered</small><br/>
            <button
                onClick={handleRefresh}>Refresh
            </button>
            <h4> {program.name}</h4>

            <Image src={`https:${program.image}`} width={250}
                   height={250}/>

            {showDescription && <p>{program.description}</p>}
        </div>
    )
}

async function findProgram(name: string) {
    console.log(`[INFO]: fetching program`)
    const response = await fetch('https://test-backend-nextjs.azurewebsites.net/api/entries')
    const entries = await response.json()
    const program = entries.items.map((item: any) => {
        const program = {
            name: item.fields.name,
            description: item.fields.description,
            image: item.fields.image.fields.file.url
        }

        return program
    }).find((p: any) => p.name === name)

    return program;
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const program = await findProgram(String(params?.name))
    return {
        props: {program}
    }

}

export default ServerSideRenderedSingle
