import Hero from '@app/components/pages/home/Hero'
import Mission from '@app/components/pages/home/Mission'
import ProjectGoals from '@app/components/pages/home/ProjectGoals'
import Capabilities from '@app/components/pages/home/Capabilities'
import VideoSection from '@app/components/pages/home/Video'
import FormSection from '@app/components/pages/home/Form'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { defaultLanguage } from '@app/@types/languages'
import { $apiCommon } from '@app/lib/api'
import { CommonSeoTextList200Response } from '@app/lib/api/gen'
import SeoText from '@app/components/ui/SeoText'
interface ISeoData {
  seoData: CommonSeoTextList200Response
}
const Home = ({ seoData }: ISeoData) => {
  return (
    <>
      <Hero />
      <Mission />
      <VideoSection />
      <ProjectGoals />
      <Capabilities />
      <FormSection />
      <SeoText data={seoData} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await $apiCommon.commonSeoTextList('main', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })

  return {
    props: {
      seoData: data,
      ...(await serverSideTranslations(locale || defaultLanguage, [
        'home',
        'projectGoal',
        'opportunities',
        'buttons',
        'forms',
        'validationForm',
      ])),
    },
  }
}

export default Home
