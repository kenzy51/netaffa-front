import React, { ReactNode } from 'react'
import { styled } from 'styled-components'
import { theme } from '@app/styles/theme'
import Image from 'next/image'
import MyMapComponent from '@app/components/ui/map/Map'
import FacebookIcon from 'public/images/svg/social-media/facebook.svg'
import TwitterIcon from 'public/images/svg/social-media/twitter.svg'
import YoutubeIcon from 'public/images/svg/social-media/youtube.svg'
import TelegramIcon from 'public/images/svg/social-media/telegram.svg'
import locationIcon from 'public/images/svg/location-iconBlue.svg'
import clockIcon from 'public/images/svg/clock-icon.svg'
import phoneIcon from 'public/images/svg/phone-icon.svg'
import mailIcon from 'public/images/svg/mail-icon.svg'
import browserIcon from 'public/images/svg/browser-icon.svg'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { ContactsBranchesList200Response } from '@app/lib/api/gen'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
interface IChildren {
  children?: ReactNode
  branchText?: string
  branchesData: ContactsBranchesList200Response
}
const Branches = ({ branchText, branchesData }: IChildren) => {
  const md = useMediaQuery('md')
  const height = md ? '290px' : '360px'
  const { t } = useTranslation('contacts')
  return (
    <Wrapper>
      <DescriptionTitle size={32}>{branchText}</DescriptionTitle>
      {branchesData.results?.map((branch) => (
        <>
          <SmallTitle>Кыргызстан</SmallTitle>
          <LeftBlock key={branch.id}>
            <MapBlock>
              <MyMapComponent location={[branch.latitude, branch.longitude]} height={height} borderRadius="10px" />
            </MapBlock>
            <ContactsBlock>
              {md ? '' : <DescriptionTitle>{branch.name}</DescriptionTitle>}
              <AllContacts>
                <ContactItem>
                  <Image src={locationIcon} alt="contact icon" width={30} height={30} />
                  <p>{branch.address}</p>
                </ContactItem>
                <ContactItem>
                  <Image src={clockIcon} alt="contact icon" width={30} height={30} />
                  <p>{branch.schedule}</p>
                </ContactItem>
                {branch.contacts?.map((contact, index) => (
                  <ContactItem key={index}>
                    <Image src={phoneIcon} alt="contact icon" width={30} height={30} />
                    <p>{contact.phone_number}</p>
                  </ContactItem>
                ))}
                <ContactItem>
                  <Image src={mailIcon} alt="contact icon" width={30} height={30} />
                  <Link href={`mailto:${branch.email}`} target="_blank">
                    {branch.email}
                  </Link>
                </ContactItem>
                <ContactItem>
                  <Image src={browserIcon} alt="contact icon" width={30} height={30} />
                  {!!branch.web_site && (
                    <Link href={branch.web_site?.toString()} target="_blank">
                      {branch.web_site}
                    </Link>
                  )}
                </ContactItem>
              </AllContacts>
              <Line />
              <SocialContainer>
                <HowToGetText>{t('socialMedias')}</HowToGetText>
                <FooterBottomLeft>
                  {!!branch.facebook && (
                    <Link href={branch?.facebook?.toString()} target="_blank">
                      <Image src={FacebookIcon} alt="icon" width={24} height={24} />
                    </Link>
                  )}
                  {!!branch.twitter && (
                    <Link href={branch?.twitter?.toString()} target="_blank">
                      <Image src={TwitterIcon} alt="icon" width={24} height={24} />
                    </Link>
                  )}
                  {!!branch.youtube && (
                    <Link href={branch?.youtube?.toString()} target="_blank">
                      <Image src={YoutubeIcon} alt="icon" width={24} height={24} />
                    </Link>
                  )}
                  {!!branch.telegram && (
                    <Link href={branch?.telegram?.toString()} target="_blank">
                      <Image src={TelegramIcon} alt="icon" width={24} height={24} />
                    </Link>
                  )}
                </FooterBottomLeft>
              </SocialContainer>
            </ContactsBlock>
          </LeftBlock>
        </>
      ))}
    </Wrapper>
  )
}
const { mqMax, colors } = theme
const Line = styled.div`
  background: #cecece;
  height: 1px;
  width: 381px;
  margin-top: 20px;
  ${mqMax('xl')} {
    width: 100%;
  }
  ${mqMax('sm')} {
    display: none;
  }
`

const MapBlock = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ${mqMax('md')} {
    margin-bottom: 1px;
  }
  ${mqMax('sm')} {
    margin-bottom: -13px;
  }
`

const LeftBlock = styled.div`
  display: flex;
  gap: 65px;
  ${mqMax('xl')} {
    width: 100%;
    flex-direction: column;
  }
`
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: Roboto, sans-serif;
  a {
    color: ${theme.colors.primary};
    ${mqMax('sm')} {
      font-size: 14px;
    }
  }
  p {
    font-size: 16px;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    color: ${theme.colors.gray_200};
  }
  ${mqMax('sm')} {
    p {
      font-size: 14px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
    }
    gap: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`
const HowToGetText = styled.div`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.09px;
  ${mqMax('md')} {
    margin-top: 5px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 0 0 0;
  ${mqMax('xl')} {
    gap: 30px;
  }
  ${mqMax('md')} {
    padding: 0 0 0 0;
  }
`
const FooterBottomLeft = styled.div`
  display: flex;
  gap: 32px;
`
const SocialContainer = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const AllContacts = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${mqMax('md')} {
    margin-top: -40px;
    gap: 8px;
  }
`
const ContactsBlock = styled.div`
  display: flex;
  flex-direction: column;
`
const DescriptionTitle = styled.h4<{ size?: number }>`
  font-size: ${({ size }) => (size ? `${size}px` : '24px')};
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.16px;
  color: ${colors.dark};
  ${mqMax('md')} {
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
  }
`
const SmallTitle = styled.h4`
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.09px;
  color: ${colors.dark};
  ${mqMax('md')} {
    margin-top: -10px;
    margin-bottom: -20px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.12px;
  }
`
export default Branches
