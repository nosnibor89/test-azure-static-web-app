import type {GetServerSideProps, NextPage} from 'next'
import Image from "next/image";

interface ServerSideRenderedProps {
    program: any
}

const ServerSideRenderedSingle: NextPage<ServerSideRenderedProps> = ({program}) => {
    return (
        <div style={{width: '50%'}}>
            <h4> {program.name}</h4>
            <p>{program.description}</p>
            <Image src={`https:${program.image}`} width={50}
                   height={50}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await fetch('http://localhost:7071/api/entries')
    const entries = await response.json()
    const program = entries.items.map((item: any) => {
        const program = {
            name: item.fields.name,
            description: item.fields.description,
            image: item.fields.image.fields.file.url
        }

        return program
    }).find((p: any) => p.name === params?.name)


    return {
        props: {program}
    }

}

export default ServerSideRenderedSingle
