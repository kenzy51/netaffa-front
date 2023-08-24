import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import prevPicture from 'public/images/svg/prevPicture.svg'
import nextPicture from 'public/images/svg/nextSlider.svg'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@app/styles/theme'
import useMediaQuery from '@app/hooks/useMediaQuery'

const SwiperBanner = ({ banners }: any) => {
  const isMedium = useMediaQuery('md')
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <>
      <Swiper
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cssMode={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        keyboard={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner: any) => (
          <SwiperSlide key={banner.id}>
            <ImageBanner src={banner.banner} alt={`Banner ${banner.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMedium && (
        <Buttons>
          <div ref={prevRef}>
            <Image src={prevPicture} alt="picture" width={80} height={80} />
          </div>
          <div ref={nextRef}>
            <Image src={nextPicture} alt="picture" width={80} height={80} />
          </div>
        </Buttons>
      )}
    </>
  )
}

const { mqMax } = theme

const ImageBanner = styled.img<{ banner?: string }>`
  width: 100%;
  height: 500px;
  background-image: ${({ banner }) => `url(${banner})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  ${mqMax('md')} {
    height: 200px;
  }

  ${mqMax('md')} {
    height: 130px;
  }
`

const Buttons = styled.div`
  position: relative;
  top: -290px;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  div {
    cursor: pointer;
  }
`

export default SwiperBanner
