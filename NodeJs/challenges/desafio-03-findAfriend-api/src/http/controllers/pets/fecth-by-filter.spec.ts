import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'

describe('Fetch by fiter test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch pets by filtering', async () => {})
})
