import { create } from 'zustand'
import { produce } from 'immer'
import { devtools } from 'zustand/middleware'
import { $apiLocations } from '@app/lib/api'
import { City, Country } from '@app/lib/api/gen/api'
import { defaultLanguage, TLanguage } from '@app/@types/languages'

type TState = {
  cities: City[]
  countries: Country[]
}

type TActions = {
  fetchCities: (locale?: TLanguage) => void
  fetchCountries: (locale?: TLanguage) => void
}

export const useLocations = create<TState & TActions>()(
  devtools((set) => ({
    cities: [],
    countries: [],
    fetchCities: async (locale) => {
      const { data } = await $apiLocations.citiesCitiesList(undefined, undefined, undefined, {
        headers: {
          'Accept-Language': locale || defaultLanguage,
        },
      })

      set(
        produce((state) => {
          state.cities = data.results
        })
      )
    },
    fetchCountries: async (locale) => {
      const { data } = await $apiLocations.citiesCountriesList(undefined, undefined, {
        headers: {
          'Accept-Language': locale || defaultLanguage,
        },
      })

      set(
        produce((state) => {
          state.countries = data.results
        })
      )
    },
  }))
)
