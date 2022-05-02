import { ApisauceInstance, create } from 'apisauce'
import { MarvelResponse } from '../type'
import { getAuthQueryStringParams } from '../utils'

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any
  set?(
    target: { results: { [key in P]?: T } },
    p: P,
    value: any,
    receiver: any
  ): boolean
}

declare const Proxy: {
  new <T extends object>(
    target: { results: { [key in string]?: T }; apiInstance: ApisauceInstance },
    handler: ProxyHandler<T, string>
  ): { [key: string]: Promise<T> }
}

export const marvelProxy = new Proxy<MarvelResponse>(
  {
    apiInstance: create({
      baseURL: 'https://gateway.marvel.com',
      params: getAuthQueryStringParams()
    }),
    results: {}
  },
  {
    get: function <T extends MarvelResponse>(
      target: {
        results: {
          [key in string]?: T
        }
      },
      url: string
    ) {
      const values = target

      return new Promise<T>(async (resolve, reject) => {
        if (
          values.results.hasOwnProperty(url) ||
          url === '$$typeof' ||
          url === 'prototype'
        ) {
          resolve(values.results[url] as T)
          return
        }

        try {
          const response = await (
            target as {
              results: {
                [key in string]?: T
              }
              apiInstance: ApisauceInstance
            }
          ).apiInstance.get<T>(url)

          if (response.status !== 200 || !response.data) {
            throw new Error('Error fetching data')
          }

          const { data } = response

          ;(
            target as {
              results: {
                [key in string]?: T
              }
            }
          ).results[url] = data

          return data
        } catch (e) {
          reject(e)
        }
      })
    },
    set: (target, url: string, value) => {
      target.results[url] = value
      return true
    }
  }
)
