import type {GetStaticProps, NextPage} from 'next'
import Image from "next/image";
import Link from "next/link";


interface StaticRenderedProps {
    programs: any[]
}

const StaticRendered: NextPage<StaticRenderedProps> = ({programs}) => {
    return (
        <>
            <h2>The programs:</h2>
            {programs.map(p => {
                return (
                    <div key={p.name} style={{width: '50%'}}>
                        <h4><Link href={`/static/${p.name}`}>
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

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('https://test-backend-nextjs.azurewebsites.net/api/entries')
    const entries = await response.json()

    const programs = entries.items.map((item: any) => {
        const program = {
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

export default StaticRendered
