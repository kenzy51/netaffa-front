import { useTranslation } from 'next-i18next'
import * as yup from 'yup'

export const GetValidationSchema = () => {
  const { t: tValidation } = useTranslation('validationForm')

  return yup.object({
    full_name: yup.string().required(tValidation('requiredfield')),
    phone_number: yup.string().required(tValidation('requiredfield')),
    email: yup.string().email(tValidation('incorrectFormat')).required(tValidation('requiredfield')),
    video: yup.mixed().required(tValidation('requiredfield')),
    message: yup.string().required(tValidation('requiredfield')),
  })
}

export const GetValidationSchemaWithoutVideo = () => {
  const { t: tValidation } = useTranslation('validationForm')

  return yup.object({
    full_name: yup.string().required(tValidation('requiredfield')),
    phone_number: yup.string().required(tValidation('requiredfield')),
    email: yup.string().email(tValidation('incorrectFormat')).required(tValidation('requiredfield')),
    message: yup.string().required(tValidation('requiredfield')),
  })
}

export const GetValidationSchemaWithCity = () => {
  const { t: tValidation } = useTranslation('validationForm')

  return yup.object({
    city: yup.string().required(tValidation('requiredfield')),
    full_name: yup.string().required(tValidation('requiredfield')),
    phone_number: yup.string().required(tValidation('requiredfield')),
    email: yup.string().email(tValidation('incorrectFormat')).required(tValidation('requiredfield')),
    message: yup.string().required(tValidation('requiredfield')),
  })
}
