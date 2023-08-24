import { CSSProperties, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useMediaQuery from '@app/hooks/useMediaQuery'
import { theme } from '@app/styles/theme'
import DefaultButton from '@app/components/ui/buttons/DefaultButton'
import { formDataHttp } from '@app/lib/helpers/formData'
import { ConsultationFormTypeEnum } from '@app/lib/api/gen/api'
import Link from 'next/link'
import InputMask from 'react-input-mask'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InlineSVG from 'react-inlinesvg'
import StapleIcon from 'public/images/svg/staple.svg'
import BoyImage from 'public/images/jpg/form-boy.jpg'
import GirlImage from 'public/images/jpg/form-girl.jpg'
import { toast } from 'react-toastify'
import Checkbox from '@app/components/ui/inputs/Checkbox'

interface IWhoCheckbox {
  label: string
  value: ConsultationFormTypeEnum
}

const validationSchema = yup.object({
  full_name: yup.string().required('Обязательное поле'),
  phone_number: yup.string().required('Обязательное поле'),
  email: yup.string().email('Неверный формат').required('Обязательное поле'),
  video: yup.mixed().required('Обязательное поле'),
  message: yup.string().required('Обязательное поле'),
})

const CareerForm = () => {
  const xl = useMediaQuery('xl')
  const formik = useFormik({
    initialValues: {
      type: 'sponsor',
      full_name: '',
      phone_number: '',
      email: '',
      video: null,
      message: '',
    },
    onSubmit: async (values) => {
      await toast.promise(formDataHttp(values, '/career/Career-forms/', 'POST'), {
        pending: 'Загрузка...',
        success: 'Успех!',
        error: 'Ошибочка...',
      })
      formik.resetForm()
    },
    validationSchema,
  })
  const { full_name, phone_number, email, message } = formik.values
  const { current: whoCheckboxes } = useRef<IWhoCheckbox[]>([
    {
      label: 'спонсор',
      value: 'sponsor',
    },
    {
      label: 'родитель',
      value: 'parent',
    },
    {
      label: 'ребенок',
      value: 'children',
    },
  ])

  return (
    <Section>
      <Container>
        {!xl && (
          <LeftImage>
            <Image src={BoyImage} alt="boy" width={570} height={1000} />
          </LeftImage>
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Title>Записаться на консультацию</Title>
          <FormContent>
            <CheckBoxes>
              {whoCheckboxes.map(({ label, value }) => (
                <Checkbox
                  value={value}
                  onChange={(e) => formik.setFieldValue('type', e.target.value)}
                  label={label}
                  checked={formik.values.type === value}
                  styles={{
                    text: {
                      fontWeight: 400,
                      fontSize: 16,
                    },
                  }}
                  key={value}
                />
              ))}
            </CheckBoxes>
            <Input onChange={formik.handleChange} value={full_name} name="full_name" placeholder="ФИО*" />

            <InputMaskWrapper>
              <InputMask
                mask="+ 7 (999) 999-99-99"
                alwaysShowMask
                onChange={formik.handleChange}
                value={phone_number}
                name="phone_number"
              />
            </InputMaskWrapper>

            <Input onChange={formik.handleChange} value={email} name="email" placeholder="Ваш e-mail" />

            <InputVideoWrapper>
              <input
                type="file"
                name="video"
                accept="video/*"
                value={undefined}
                onChange={(e) => formik.setFieldValue('video', e.target.files?.[0])}
              />
              <InlineSVG src={StapleIcon.src} />
              <p>{formik.values.video ? 'Выбрать другое' : 'Ваше видеосообщение'}</p>
            </InputVideoWrapper>

            <Textarea onChange={formik.handleChange} value={message} name="message" placeholder="Текст сообщения" />

            {!!Object.values(formik.errors).length && formik.touched.full_name && (
              <ErrorText>Заполните все поля верно!</ErrorText>
            )}
            <BtnWrapper>
              <DefaultButton type="submit">Отправить</DefaultButton>
            </BtnWrapper>
            <Consent>
              Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь{' '}
              <Link href="/">с политикой конфиденциальности</Link>
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
  padding: 79px 142px;
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
const CheckBoxes = styled.div`
  display: flex;
  justify-content: space-between;
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
const InputMaskWrapper = styled.div`
  input {
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
    margin-bottom: 10px;
    &:focus-within {
      border-bottom: 1px solid ${colors.primary};
      outline: none;
    }
  }
`
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
                                         &:focus-within {
    border-bottom: 1px solid ${colors.primary};
    outline: none;
  }
  }
  p {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: ${colors.gray_200};
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

export default CareerForm
