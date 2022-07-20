import type {GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Image from "next/image";
import StaticRendered from "./index";

interface StaticRenderedProps {
    program: any
}

const StaticRenderedSingle: NextPage<StaticRenderedProps> = ({program}) => {
    return (
        <div style={{width: '50%'}}>
            <h4> {program.name}</h4>
            <p>{program.description}</p>
            <Image src={`https:${program.image}`} width={50}
                   height={50}/>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
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

    const paths = programs.map((p: any) => {
        return {
            params: {
                name: p.name
            }
        }
    })

    return {
        paths: paths,
        fallback: false // false or 'blocking'
    };
}

export default StaticRenderedSingle
