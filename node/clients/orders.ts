import type * as api from '@vtex/api'
import { OMS } from '@vtex/clients'

export default class Orders extends OMS {
  constructor(context: api.IOContext, options?: api.InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public search = (searchParams: SearchParams) => {
    searchParams = { page: 1, perPage: 10, ...searchParams }

    const params: any = {
      q: searchParams.clientEmail,
      page: searchParams.page,
      perPage: searchParams.perPage,
    }

    if (searchParams) {
      if (searchParams.status) {
        params.f_status = searchParams.status
      }

      if (searchParams.creationDate) {
        params.f_creationDate = `creationDate:[${searchParams.creationDate[0].toISOString()} TO ${searchParams.creationDate[1].toISOString()}]`
      }
    }

    return this.http.get(this.uri, {
      params,
    })
  }

  private get uri() {
    return `api/oms/pvt/orders`
  }
}
