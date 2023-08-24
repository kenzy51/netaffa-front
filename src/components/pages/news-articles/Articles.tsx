import React, { useState } from 'react'
import { styled } from 'styled-components'
import { NewsArticlesArticlesList200Response, Article } from '@app/lib/api/gen'
import arrow from 'public/images/svg/arrows/arrowIcon.svg'
import InlineSVG from 'react-inlinesvg'
import { Wrapper } from '@app/components/pages/news-articles/News'
import { theme } from '@app/styles/theme'
import ArticleItem from '@app/components/pages/news-articles/ArticleItem'

interface ArticlesProps {
  articles?: NewsArticlesArticlesList200Response
}

const Articles = ({ articles }: ArticlesProps) => {
  const [visibleItems, setVisibleItems] = useState(4)

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4)
  }

  const articlesResults = articles?.results || []

  return (
    <>
      <TitleBlock>Статьи</TitleBlock>
      <Wrapper>
        {articlesResults.slice(0, visibleItems).map((article: Article) => (
          <ArticleItem item={article} key={article.id} />
        ))}
      </Wrapper>
      {visibleItems < articlesResults.length && (
        <LoadMoreButton onClick={handleLoadMore}>
          Показать еще <InlineSVG src={arrow.src} width={10} height={10} />
        </LoadMoreButton>
      )}
    </>
  )
}
const { mqMax } = theme
export const TitleBlock = styled.h1`
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.16px;
  margin-top: 40px;
  margin-bottom: 20px;
  ${mqMax('sm')} {
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 12px;
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

export default Articles
