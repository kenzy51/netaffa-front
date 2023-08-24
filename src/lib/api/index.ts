import { $api } from './axios'
import {
  CareerApi,
  ContactsApi,
  EducationApi,
  ChildrenClubsApi,
  CitiesApi,
  CampsApi,
  MedicineApi,
  NewsArticlesApi,
  SponsorApi,
  CommonApi,
} from './gen/index'

export const $apiCareer = new CareerApi(undefined, undefined, $api)
export const $apiContacts = new ContactsApi(undefined, undefined, $api)
export const $apiEducation = new EducationApi(undefined, undefined, $api)
export const $apiChildrenClubs = new ChildrenClubsApi(undefined, undefined, $api)
export const $apiLocations = new CitiesApi(undefined, undefined, $api)
export const $apiCamps = new CampsApi(undefined, undefined, $api)
export const $apiMedicine = new MedicineApi(undefined, undefined, $api)
export const $apiNewsArticles = new NewsArticlesApi(undefined, undefined, $api)
export const $apiSponsor = new SponsorApi(undefined, undefined, $api)
export const $apiCommon = new CommonApi(undefined, undefined, $api)
