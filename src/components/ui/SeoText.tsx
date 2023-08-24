import React from 'react'
import { theme } from '@app/styles/theme'
import { styled } from 'styled-components'
import { useRouter } from 'next/router'
interface ISeoData {
  data?: any
  page?: string
}
const SeoText = (props: ISeoData) => {
  const { data } = props
  const text = data?.results?.[0]?.text.replace(/<pre\b[^>]*>(.*?)<\/pre>/gs, '$1')
  const { locale } = useRouter()
  const seo = locale === 'ru' ? 'Seo текст' : 'Seo text'

  return (
    <Wrapper>
      <Container>
        <DescriptionTitle>{seo}</DescriptionTitle>
        <div dangerouslySetInnerHTML={{ __html: data ? text : 'Текст отсутствует' }} />
      </Container>
    </Wrapper>
  )
}
const { containers, mqMax, colors } = theme

const Container = styled.div`
  max-width: ${containers.main};
  margin: 0 auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const Wrapper = styled.div`
  background: white;
  padding: 55px 0;
  ${mqMax('sm')} {
    padding: 33px 13px;
  }
`

const DescriptionTitle = styled.h4`
  font-size: 32px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.16px;
  color: ${colors.dark};
  ${mqMax('md')} {
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
  }
`
export default SeoText
