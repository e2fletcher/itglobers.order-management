import { UserInputError } from '@vtex/api'
import * as parse from 'co-body'
import { ZodError, z } from 'zod'

const schema = z
  .object({
    clientEmail: z.string().email().min(1),
    status: z.string().nullish(),
    page: z.number().int().min(1).nullish(),
    perPage: z.number().int().min(1).nullish(),
    creationDate: z.array(z.coerce.date()).length(2).nullish(),
  })
  .strict()

export async function validate(ctx: Context, next: () => Promise<any>) {
  try {
    const searchParams = schema.parse(await parse.json(ctx.req)) as SearchParams

    ctx.state.searchParams = searchParams
  } catch (err) {
    if (err instanceof ZodError) {
      throw new UserInputError({
        message: 'SearchParams invalid',
        errors: err.issues,
      })
    }

    throw err
  }

  await next()
}
