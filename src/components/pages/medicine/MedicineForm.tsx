import { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { theme } from '@app/styles/theme'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import { formDataHttp } from '@app/lib/helpers/formData'
// import Link from 'next/link'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { ReactNode } from 'react'
import BoyImage from 'public/images/jpg/form-boy.jpg'
import GirlImage from 'public/images/jpg/form-girl.jpg'
import Select from '@app/components/ui/Select'
import InlineSVG from 'react-inlinesvg'
import StapleIcon from '../../../../public/images/svg/staple.svg'
import CountrySelectorInput from '@app/components/ui/inputs/CountrySelectorInput'
import { useLocations } from '@app/lib/store/locations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetValidationSchemaWithCity } from '@app/lib/consts/validationSchema'

interface IChildren {
  children: ReactNode
}

const MedicineForm = ({ children }: IChildren) => {
  const { t } = useTranslation('forms')
  const { t: tButton } = useTranslation('buttons')
  const { locale } = useRouter()
  const [citiesStore, countries] = useLocations((state) => [state.cities, state.countries])
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const cities = citiesStore.filter((city) => city.country === +selectedCountry)
  const validationSchema = GetValidationSchemaWithCity()
  const { t: tValidation } = useTranslation('validationForm')

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption)
    formik.setFieldValue('city', selectedOption)
  }

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption)
  }

  const xl = useMediaQuery('xl')
  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      email: '',
      video: null,
      message: '',
      city: selectedCity,
    },
    onSubmit: async (values) => {
      await toast.promise(formDataHttp(values, '/medicine/interpreter-help-forms/', 'POST'), {
        pending: 'Загрузка...',
        success: 'Успех!',
        error: 'Ошибочка...',
      })
      formik.resetForm()
    },
    validationSchema,
  })
  const { full_name, phone_number, email, message } = formik.values
  const chooseCityText = locale === 'ru' ? 'Выбрать город' : 'Select city'
  const chooseCountryText = locale === 'ru' ? 'Выбрать страну' : 'Select country'
  return (
    <Section>
      <Container>
        {!xl && xl != undefined && (
          <LeftImage>
            <Image src={BoyImage} alt="boy" width={570} height={1000} />
          </LeftImage>
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Title>{children}</Title>
          <FormContent>
            {cities && (
              <CheckBoxes>
                {
                  <Select
                    options={[
                      { label: chooseCountryText, value: '' },
                      ...(countries?.map((country) => ({
                        label: country.name,
                        value: `${country?.id}`,
                      })) || []),
                    ]}
                    value={selectedCountry}
                    placeholder={chooseCountryText}
                    onSelected={handleCountryChange}
                  />
                }
                <Select
                  options={[
                    { label: chooseCityText, value: '' },
                    ...(cities?.map((city) => ({
                      label: city.name,
                      value: `${city?.id}`,
                    })) || []),
                  ]}
                  value={selectedCity}
                  placeholder={chooseCityText}
                  onSelected={handleCityChange}
                />
              </CheckBoxes>
            )}
            <Input onChange={formik.handleChange} value={full_name} name="full_name" placeholder={t('name')} />
            <div style={{ marginTop: '5px' }}>
              <CountrySelectorInput formik={formik} phone_number={phone_number} />
            </div>
            <Input onChange={formik.handleChange} value={email} name="email" placeholder={t('email')} />
            <InputVideoWrapper>
              <input
                type="file"
                name="video"
                accept="video/*"
                value={undefined}
                onChange={(e) => formik.setFieldValue('video', e.target.files?.[0])}
              />
              <InlineSVG src={StapleIcon.src} />
              <p>{formik.values.video ? t('videoMessageAnother') : t('videoMessage')}</p>
            </InputVideoWrapper>
            <Textarea onChange={formik.handleChange} value={message} name="message" placeholder={t('messageText')} />
            {!!Object.values(formik.errors).length && formik.touched.full_name && (
              <ErrorText>{tValidation('fillFieldsCorrectly')}</ErrorText>
            )}
            <BtnWrapper>
              <DefaultButton type="submit">{tButton('send')}</DefaultButton>
            </BtnWrapper>
            <Consent>
              {t('privacyPolicy')}
              <Link href="/">{t('privacyPolicyButton')}</Link>
            </Consent>
          </FormContent>
        </Form>
        {!xl && xl != undefined && (
          <RightImage>
            <Image src={GirlImage} alt="girl" width={570} height={1000} />
          </RightImage>
        )}
      </Container>
    </Section>
  )
}

const { colors, mqMax } = theme

const InputVideoWrapper = styled.label`
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  column-gap: 10px;
  padding: 15px 0;
  border-bottom: 1px solid ${colors.gray_200};
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }
  p {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: ${colors.gray_200};
  }
  &:focus-within {
    border-bottom: 1px solid ${colors.primary};
    outline: none;
  }
  ${mqMax('sm')} {
    p {
      font-size: 14px;
    }
  }
`
const Section = styled.section`
  padding-bottom: 40px;
  ${mqMax('sm')} {
    padding-bottom: 40px;
  }
`
const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
`
const LeftImage = styled.div`
  img {
    width: 100%;
    border-radius: 500px;
    overflow: hidden;
    object-fit: cover;
  }
`
const Form = styled.form`
  flex: 1;
  background: ${colors.white};
  border-radius: 500px;
  padding: 79px 122px;
  ${mqMax('xxl2')} {
    padding: 79px 84px;
  }
  ${mqMax('md')} {
    padding: 59px 34px;
  }
  ${mqMax('sm')} {
    padding: 59px 0;
    border-radius: 200px;
  }
`
const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 62px;
  text-align: center;
  color: ${colors.gray_900};
  margin-bottom: 20px;
  span {
    display: block;
  }
  ${mqMax('md')} {
    font-size: 24px;
    line-height: 26px;
    width: 95%;
  }
`
const FormContent = styled.div`
  //  max-width: 490px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 31.5px;
`
const CheckBoxes = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  margin-bottom: 15px;
  ${mqMax('md')} {
    flex-direction: column;
    row-gap: 15px;
    margin-bottom: 20px;
  }
`
const Input = styled.input<{ customStyle?: CSSProperties }>`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: ${colors.gray_200};
  border-bottom: 1px solid ${colors.gray_200};
  padding: 13px 0;
  width: 100%;
  ${(p) => p.customStyle as never}
  margin-bottom: 10px;
  ${mqMax('md')} {
    font-size: 14px;
    margin-bottom: 20px;
  }
  &:focus-within {
    border-bottom: 1px solid ${colors.primary};
    outline: none;
  }
`

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 176px;
  border: 1px solid ${colors.gray_200};
  margin: 15px 0 20px;
  padding: 12px 16px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: ${colors.gray_200};
  &:focus-within {
    border: 1px solid ${colors.primary};
    outline: none;
  }
`
const ErrorText = styled.h6`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`
const Consent = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: ${colors.gray_900};
  a {
    color: ${colors.primary};
    display: block;
  }
`

const RightImage = styled(LeftImage)``

export default MedicineForm
