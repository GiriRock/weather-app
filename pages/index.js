import Head from 'next/head'
import SearchForm from '../components/SearchForm'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Search Place</title>
      </Head>

      <div className="container mx-auto px-10">
        <div className="m-20 w-full lg:w-6/12 mx-auto">
          <SearchForm action="/search" />
        </div>
      </div>
    </Layout>
  )
}
