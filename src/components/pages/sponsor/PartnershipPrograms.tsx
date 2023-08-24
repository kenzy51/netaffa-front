import React, { useState } from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'
import InlineSVG from 'react-inlinesvg'
import ArrowDefault from 'public/images/svg/arrows/arrowIcon.svg'
import ProgramAccordion from '@app/components/pages/sponsor/ProgramAccordion'
import { SponsorSponsorsList200Response } from '@app/lib/api/gen'
import { useTranslation } from 'next-i18next'

interface ISponsorPrograms {
  sponsorPrograms?: SponsorSponsorsList200Response
}

const PartnershipPrograms = ({ sponsorPrograms }: ISponsorPrograms) => {
  const { t } = useTranslation('sponsor')
  const [selectedItem, setSelectedItem] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const sponsorProgramsResult = sponsorPrograms?.results
  const isLarge = useMediaQuery('lg')
  const handleItemClick = (index: number) => {
    if (selectedItem === index) {
      setIsActive(!isActive)
    } else {
      setSelectedItem(index)
      setIsActive(true)
    }
  }
  return (
    <MainWrapper>
      <Title>{t('programmesCoop')}</Title>
      <DescriptionText>{t('programmesCoopDesc')}</DescriptionText>
      <InfoBlock>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LeftSelector>
            {sponsorProgramsResult?.map((item, index) => (
              <SelectItem key={item.id} onClick={() => handleItemClick(index)}>
                {!isLarge ? <SmallTitle active={selectedItem === index}>{item.title}</SmallTitle> : null}
                {!isLarge && isLarge != undefined ? (
                  <DescriptionText dangerouslySetInnerHTML={{ __html: item.short_description }} />
                ) : null}
                {isLarge ? (
                  <ProgramAccordion
                    key={item.id}
                    label={item.title}
                    customArrow={<InlineSVG src={ArrowDefault.src} />}
                    styles={{
                      accordionStyles: {
                        marginTop: '8px',
                      },
                      contentStyles: {
                        marginTop: '12px',
                      },
                      labelStyles: {
                        fontSize: '18px',
                      },
                    }}
                  >
                    {isActive && selectedItem === index && isLarge ? (
                      <RightInfoBlock>
                        {sponsorProgramsResult.map((item, index) => (
                          <InnerWrapperBlock key={item.id}>
                            {selectedItem === index && (
                              <>
                                <MediumTitle>{item.title}</MediumTitle>
                                <ImageBlock>
                                  <DescriptionText dangerouslySetInnerHTML={{ __html: item.description }} />
                                </ImageBlock>
                              </>
                            )}
                          </InnerWrapperBlock>
                        ))}
                      </RightInfoBlock>
                    ) : null}
                  </ProgramAccordion>
                ) : null}
                <Line />
              </SelectItem>
            ))}
          </LeftSelector>
        </div>
        {!isLarge && sponsorProgramsResult ? (
          <RightInfoBlock>
            {sponsorProgramsResult?.map((item, index) => (
              <InnerWrapperBlock key={item.title}>
                {selectedItem === index ? (
                  <>
                    <MediumTitle>{item.title}</MediumTitle>
                    <ImageBlock>
                      <DescriptionText dangerouslySetInnerHTML={{ __html: item.description }} />
                    </ImageBlock>
                  </>
                ) : null}
              </InnerWrapperBlock>
            ))}
          </RightInfoBlock>
        ) : null}
      </InfoBlock>
    </MainWrapper>
  )
}
const { mqMax, colors } = theme
const SmallTitle = styled.div<{ active: boolean }>`
  font-size: 18px;
  ${(props) => (props.active ? `color: ${theme.colors.primary};` : null)}
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 111.111% */
  letter-spacing: -0.09px;
  margin-bottom: 8px;
  transition-duration: 0.3s;
  cursor: pointer;
  &:hover {
    color: ${colors.primary};
  }
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 125px;
  margin-top: 40px;
  ${mqMax('lg')} {
    flex-direction: column;
  }
`
const MainWrapper = styled.div`
  padding-top: 60px;
`

const RightInfoBlock = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 690px;
`
const InnerWrapperBlock = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`
const MediumTitle = styled.h3`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px; /* 118.75% */
  letter-spacing: -0.16px;
`
const ImageBlock = styled.div`
  display: flex;
  gap: 24px;
`

const DescriptionText = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  line-height: 25px;
  color: ${colors.gray_200};
  ${mqMax('sm')} {
    font-size: 14px;
    line-height: 150%; /* 21px */
  }
`
const Title = styled.h1`
  font-size: 46px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 53px;
  letter-spacing: -0.324px;
  color: ${colors.dark};
  margin-bottom: 30px;
  ${mqMax('sm')} {
    line-height: 26px; /* 108.333% */
    letter-spacing: -0.12px;
    margin-bottom: 8px;

    font-size: 24px;
    font-weight: 700;
  }
`
const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 100%;
  margin: 16px 0;
  ${mqMax('sm')} {
    max-width: 294px;
  }
`

const LeftSelector = styled.div``
const SelectItem = styled.div`
  max-width: 382px;
`

export default PartnershipPrograms
