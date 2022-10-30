import Head from 'next/head'
import Layout from '../components/Layout'
import SearchForm from '../components/SearchForm'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-10">
        <div className="m-20 w-full lg:w-6/12 mx-auto">
          <SearchForm action="/search" />
        </div>
      </div>
    </Layout>
  )
}
