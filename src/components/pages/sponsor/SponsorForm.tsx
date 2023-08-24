import { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { theme } from '@app/styles/theme'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import { formDataHttp } from '@app/lib/helpers/formData'
import Link from 'next/link'
import { useFormik } from 'formik'
import BoyImage from 'public/images/jpg/form-boy.jpg'
import GirlImage from 'public/images/jpg/form-girl.jpg'
import { toast } from 'react-toastify'
import { SponsorSponsorsList200Response } from '@app/lib/api/gen'
import PartnerSelect from '@app/components/pages/sponsor/PartnerSelect'

import * as yup from 'yup'
import CountrySelectorInput from '@app/components/ui/inputs/CountrySelectorInput'
import { useTranslation } from 'next-i18next'

interface ISponsorPrograms {
  sponsorPrograms?: SponsorSponsorsList200Response
}

const SponsorForm = ({ sponsorPrograms }: ISponsorPrograms) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { t } = useTranslation('forms')
  const { t: tButton } = useTranslation('buttons')
  const { t: tValidation } = useTranslation('validationForm')

  const validationSchema = yup.object({
    full_name: yup.string().required(tValidation('requiredfield')),
    phone_number: yup.string().required(tValidation('requiredfield')),
    email: yup.string().email(tValidation('incorrectFormat')).required(tValidation('requiredfield')),
    message: yup.string().required(tValidation('requiredfield')),
    collaboration_program: yup.number().required(tValidation('requiredfield')),
  })

  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleSelect = ({ value, label }: { value: string; label: string }) => {
    const selectedItem = sponsorPrograms?.results.find((item) => item.title === value)
    setSelectedId(selectedItem?.id || null)
    setSelectedOption(label)

    formik.setFieldValue('collaboration_program', selectedItem?.id || null)
  }

  const xl = useMediaQuery('xl')
  const formik = useFormik({
    initialValues: {
      collaboration_program: selectedId,
      full_name: '',
      phone_number: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      await toast.promise(formDataHttp(values, '/sponsor/sponsor-forms/', 'POST'), {
        pending: 'Загрузка...',
        success: 'Успех!',
        error: 'Ошибочка...',
      })
      formik.resetForm()
    },
    validationSchema,
  })
  const { full_name, phone_number, email, message } = formik.values
  const options: any = sponsorPrograms?.results.map((item) => item.title || item.id) || []
  const ids: any = sponsorPrograms?.results.map((item) => item.id) || []

  ids

  return (
    <Section>
      <Container>
        {!xl && (
          <LeftImage>
            <Image src={BoyImage} alt="boy" width={570} height={1000} />
          </LeftImage>
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Title>{t('applyCoop')}</Title>
          <FormContent>
            <PartnerSelect value={selectedOption} onChange={handleSelect} options={options} />
            <Input onChange={formik.handleChange} value={full_name} name="full_name" placeholder={t('name')} />
            <CountrySelectorInput formik={formik} phone_number={phone_number} />

            <Input onChange={formik.handleChange} value={email} name="email" placeholder={t('email')} />
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
        {!xl && (
          <RightImage>
            <Image src={GirlImage} alt="girl" width={570} height={1000} />
          </RightImage>
        )}
      </Container>
    </Section>
  )
}

const { colors, mqMax } = theme
const Section = styled.section`
  margin-top: 80px;
  padding-bottom: 90px;
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
  padding: 121px 142px;
  ${mqMax('md')} {
    padding: 59px 34px;
  }
  ${mqMax('md')} {
    padding: 59px 13px;
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
  padding: 0 31.5px;
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

export default SponsorForm
