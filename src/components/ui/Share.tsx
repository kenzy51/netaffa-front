import React, { useState } from 'react'
import { styled } from 'styled-components'
import useMediaQuery from '@app/hooks/useMediaQuery'
import shareSvg from 'public/images/svg/share 1.svg'
import Image from 'next/image'
import link from 'public/images/svg/Icon_Link.svg'
import vk from 'public/images/svg/Icon_Vk.svg'
import tg from 'public/images/svg/Icon_Tg.svg'
import ok from 'public/images/svg/Icon_Ok.svg'
import { useRouter } from 'next/router'

interface IUrlProps {
  currentUrl?: string | undefined | any
}

const Share = ({ currentUrl }: IUrlProps) => {
  const isMobile = useMediaQuery('sm')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const { locale } = useRouter()
  const share = locale === 'ru' ? 'Поделиться' : 'Share'
  const copyLink = locale === 'ru' ? 'Скопировать ссылку' : 'Copy a link'
  const handleToggleDropdown = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsDropdownOpen(false)
    }
  }
  const handleCopyLink = () => {
    if (currentUrl) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            setIsDropdownOpen(false)
          })
          .catch((error) => {
            throw error
          })
        setIsLinkCopied(true)
      } else {
        const textField = document.createElement('textarea')
        textField.value = currentUrl
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setIsDropdownOpen(false)
      }
    }
  }
  //TG
  const handleShareTelegram = () => {
    const telegramBaseUrl = 'https://t.me/share/url'
    const encodedUrl = encodeURIComponent(currentUrl)
    const telegramUrl = `${telegramBaseUrl}?url=${encodedUrl}`
    window.open(telegramUrl, '_blank')
    setIsDropdownOpen(false)
  }
  //VK
  const handleShareVk = () => {
    const vkBaseUrl = 'https://vk.com/share.php'
    const encodedUrl = encodeURIComponent(currentUrl)
    const vkUrl = `${vkBaseUrl}?url=${encodedUrl}`
    window.open(vkUrl, '_blank')
    setIsDropdownOpen(false)
  }
  //
  const handleShareOk = () => {
    const okBaseUrl = 'https://connect.ok.ru/dk'
    const encodedUrl = encodeURIComponent(currentUrl)
    const okUrl = `${okBaseUrl}?st.cmd=WidgetSharePreview&st.shareUrl=${encodedUrl}`
    window.open(okUrl, '_blank')
    setIsDropdownOpen(false)
  }

  const arrayItems = [
    {
      title: copyLink,
      icon: link,
      onClick: handleCopyLink,
    },
    {
      title: 'ВКонтакте',
      icon: vk,
      onClick: handleShareVk,
    },
    {
      title: 'Telegram',
      icon: tg,
      onClick: handleShareTelegram,
    },
    {
      title: 'Одноклассники',
      icon: ok,
      onClick: handleShareOk,
    },
  ]
  return (
    <ShareWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ButtonShare onClick={handleToggleDropdown}>
        <Image src={shareSvg} width={18} height={18} alt="share" />
        <p>{share}</p>
      </ButtonShare>
      {isDropdownOpen && (
        <DropDown>
          {arrayItems.map((item) => (
            <Item key={item.title} onClick={item.onClick}>
              <Image src={item.icon} alt={item.title} width={20} height={20} /> {item.title}
            </Item>
          ))}
        </DropDown>
      )}
      {isLinkCopied && <Notification>Ссылка скопирована!</Notification>}
    </ShareWrapper>
  )
}

const ShareWrapper = styled.div`
  margin-top: 40px;
  max-height: 140px;
  margin-bottom: 40px;
`

const DropDown = styled.div`
  background: white;
  position: absolute;
  max-width: 200px;
  border-radius: 5px;
`
const ButtonShare = styled.button`
  display: flex;
  max-width: 130px;
  gap: 10px;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 156.25% */
  color: #4f4f4f;
`

const Item = styled.li`
  transition-duration: 0.2s;
  cursor: pointer;
  display: flex;
  width: 200px;
  padding: 6px 11px;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  &:hover {
    background: var(--grey, #e6e6e6);
  }
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
`
const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  opacity: 0;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
`

export default Share
