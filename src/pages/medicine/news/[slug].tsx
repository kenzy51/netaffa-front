import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { $apiCommon, $apiNewsArticles } from '@app/lib/api'
import { theme } from '@app/styles/theme'
import { CommonSeoTextList200Response, News } from '@app/lib/api/gen'
import Breadcrumb from '@app/components/ui/Breadcrumb'
import { styled } from 'styled-components'
import { ImageWrapper } from '@app/pages/medicine/[slug]'
import Image from 'next/image'
import bannerBottom from 'public/images/png/girlMedicine.png'
import useMediaQuery from '@app/hooks/useMediaQuery'
import Share from '@app/components/ui/Share'
import SeoText from '@app/components/ui/SeoText'
import { defaultLanguage } from '@app/@types/languages'
import { useRouter } from 'next/router'

interface INewsProps {
  news?: News
  seoData?: CommonSeoTextList200Response
}

const News = (props: INewsProps) => {
  const [currentUrl, setCurrentUrl] = useState('')
  const { news } = props
  const breadcrumb = [
    { label: 'Главная', link: '/' },
    { label: 'Медицинское обслуживание', link: '/medicine' },
    { label: news?.title || '' },
  ]
  const imageSource = news?.image || ''
  const NewsTitle = news?.title || ''
  const isMobile = useMediaQuery('sm')
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])
  const { locale } = useRouter()
  const headerText = locale === 'ru' ? 'Заголовок' : 'Header'

  return (
    <Wrapper>
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumb} />
        </BreadcrumbWrapper>
        <Title>{news?.title}</Title>
      </Container>
      {!isMobile ? (
        <Container>
          <ImageWrapper>
            <Image src={imageSource} alt={NewsTitle} width={1200} height={570} />
          </ImageWrapper>
        </Container>
      ) : (
        <ImageWrapper>
          <Image src={imageSource} alt={NewsTitle} width={1200} height={570} />
        </ImageWrapper>
      )}
      <Container>
        <DescriptionTitle>{headerText}</DescriptionTitle>
        <DescriptionText dangerouslySetInnerHTML={{ __html: news?.description || '' }} />
        <StyledImage>
          <Image src={bannerBottom} alt={NewsTitle} width={1200} height={570} />
        </StyledImage>
        <SmallTitle>{headerText}</SmallTitle>
        <DescriptionText dangerouslySetInnerHTML={{ __html: news?.description || '' }} />
        <SmallTitle>{headerText}</SmallTitle>
        <DescriptionText dangerouslySetInnerHTML={{ __html: news?.description || '' }} />
        <SmallTitle>{headerText}</SmallTitle>
        <DescriptionText dangerouslySetInnerHTML={{ __html: news?.description || '' }} />
        <Share currentUrl={currentUrl} />
      </Container>
      <SeoText data={props.seoData} />
    </Wrapper>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const { data } = await $apiNewsArticles.newsArticlesNewsRead(slug as string, {
    headers: {
      'Accept-Language': locale || defaultLanguage,
    },
  })
  const { data: seoData } = await $apiCommon.commonSeoTextList('news', undefined, undefined, {
    headers: {
      'Accept-language': locale || defaultLanguage,
    },
  })
  return {
    props: {
      news: data,
      seoData: seoData,
    },
  }
}

const { containers, mqMax, colors } = theme
const StyledImage = styled.div`
  max-width: 1200px;
  margin-top: 30px;

  ${mqMax('md')} {
    margin-top: 8px;
  }
  img {
    border-radius: 10px;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`
const Wrapper = styled.div`
  background: #f8f8f8;
`
const BreadcrumbWrapper = styled.div`
  margin: 20px 0;

  ${mqMax('md')} {
    margin: 15px 0;
  }
`

const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;

  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const DescriptionText = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};

  ${mqMax('sm')} {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`
const SmallTitle = styled.div`
  margin-top: 30px;
  font-size: 24px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.12px;
  color: ${colors.dark};
  margin-bottom: 20px;

  ${mqMax('md')} {
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
  }

  ${mqMax('sm')} {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.9px;
    margin-bottom: 8px;
    margin-top: 16px;
  }
`
const Title = styled.h1`
  font-size: 54px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: -0.324px;
  color: ${colors.dark};
  margin-bottom: 30px;
  ${mqMax('sm')} {
    font-size: 24px;
    line-height: 26px;
    margin-bottom: 16px;
  }
`

const DescriptionTitle = styled.h4`
  font-size: 32px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.16px;
  margin-top: 40px;
  color: ${colors.dark};
  margin-bottom: 20px;

  ${mqMax('md')} {
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
  }

  ${mqMax('sm')} {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.9px;
    margin-bottom: 8px;
    margin-top: 15px;
  }
`
export default News
