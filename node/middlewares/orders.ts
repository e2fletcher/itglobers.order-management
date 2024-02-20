import { StatusCodes } from 'http-status-codes'

export async function orders(ctx: Context, next: () => Promise<any>) {
  const {
    state: { searchParams },
    clients,
  } = ctx

  const res = await clients.orders.search(searchParams)

  ctx.status = StatusCodes.OK
  ctx.body = res

  await next()
}
