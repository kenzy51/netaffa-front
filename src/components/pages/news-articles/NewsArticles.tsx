import React, { useState } from 'react'
import Articles from './Articles'
import News from './News'
import { NewsArticlesArticlesList200Response, NewsArticlesNewsList200Response } from '@app/lib/api/gen'
import { SmallButton } from '@app/components/ui/buttons/DefaultButton'
import styled from 'styled-components'
import { theme } from '@app/styles/theme'
import { useTranslation } from 'next-i18next'

interface IProps {
  props: {
    articles?: NewsArticlesArticlesList200Response
    news?: NewsArticlesNewsList200Response
  }
}

const NewsArticles = ({ props }: IProps) => {
  const { articles, news } = props

  const [showNews, setShowNews] = useState(true)

  const handleShowNews = () => {
    setShowNews(true)
  }

  const handleShowArticles = () => {
    setShowNews(false)
  }
  const { t } = useTranslation('medicalCare')
  return (
    <WholeWrapper>
      <Container>
        <ButtonWrapper>
          <SmallButton active={showNews} onClick={handleShowNews}>
            {t('news')}
          </SmallButton>
          <SmallButton active={!showNews} onClick={handleShowArticles}>
            {t('articles')}
          </SmallButton>
        </ButtonWrapper>
        {showNews ? <News news={news} /> : <Articles articles={articles} />}
      </Container>
    </WholeWrapper>
  )
}

const { mqMax, containers } = theme
const Container = styled.div`
  max-width: ${containers.main};
  margin: 40px auto;
  ${mqMax('xl')} {
    padding: 0 13px;
  }
`
const WholeWrapper = styled.div`
  background: white;
  padding-top: 5px;
  padding-bottom: 40px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  ${mqMax('sm')} {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`

export default NewsArticles
