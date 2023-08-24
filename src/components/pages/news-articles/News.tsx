import React, { useState } from 'react'
import { TitleBlock } from '@app/components/pages/news-articles/Articles'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import { NewsArticlesNewsList200Response, News } from '@app/lib/api/gen'
import arrow from 'public/images/svg/arrows/arrowIcon.svg'
import InlineSVG from 'react-inlinesvg'
import NewsItem from '@app/components/pages/news-articles/Item'
import { useTranslation } from 'next-i18next'

interface NewsProps {
  news?: NewsArticlesNewsList200Response
}

const NewsComponent = ({ news }: NewsProps) => {
  const [visibleItems, setVisibleItems] = useState(4)

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4)
  }
  const newsResults = news?.results || []
  const { t: tNews } = useTranslation('medicalCare')
  return (
    <>
      <TitleBlock>{tNews('news')}</TitleBlock>
      <Wrapper>
        {news?.results.slice(0, visibleItems).map((newsItem: News) => (
          <NewsItem item={newsItem} key={newsItem.id} />
        ))}
      </Wrapper>
      {visibleItems < newsResults.length && (
        <LoadMoreButton onClick={handleLoadMore}>
          {tNews('showMore')}
          <InlineSVG src={arrow.src} width={10} height={10} />
        </LoadMoreButton>
      )}
    </>
  )
}

const { mqMax } = theme

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px 20px;
  justify-items: center;
  margin-bottom: 40px;
  ${mqMax('xl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${mqMax('lg')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mqMax('sm')} {
    grid-template-columns: 1fr;
  }
`

const LoadMoreButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  color: black;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`
export default NewsComponent
