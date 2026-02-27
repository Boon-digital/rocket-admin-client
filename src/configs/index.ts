import type { EntityKey } from '@boon-digital/rocket-admin-config/registry'
import type { EntityConfig } from '@boon-digital/rocket-admin-config/entity-configs'
import { makeBookingConfig } from '@boon-digital/rocket-admin-config/entity-configs/bookings.config'
import { makeStayConfig } from '@boon-digital/rocket-admin-config/entity-configs/stays.config'
import { makeHotelConfig } from '@boon-digital/rocket-admin-config/entity-configs/hotels.config'
import { makeCompanyConfig } from '@boon-digital/rocket-admin-config/entity-configs/companies.config'
import { makeContactConfig } from '@boon-digital/rocket-admin-config/entity-configs/contacts.config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configFactories: Record<EntityKey, () => EntityConfig<any>> = {
  bookings: makeBookingConfig,
  stays: makeStayConfig,
  hotels: makeHotelConfig,
  companies: makeCompanyConfig,
  contacts: makeContactConfig,
}
