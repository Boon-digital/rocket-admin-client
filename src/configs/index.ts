import type { EntityKey } from '@boon-digital/rocket-admin-config/registry'
import type { EntityConfig } from '@boon-digital/rocket-admin-config/entity-configs'
import { makeContactConfig } from '@boon-digital/rocket-admin-config/entity-configs/contacts.config'
import { makeCompanyConfig } from '@boon-digital/rocket-admin-config/entity-configs/companies.config'
import { makeHotelConfig } from '@boon-digital/rocket-admin-config/entity-configs/hotels.config'
import { makeBookingConfig } from '@boon-digital/rocket-admin-config/entity-configs/bookings.config'
import { makeStayConfig } from '@boon-digital/rocket-admin-config/entity-configs/stays.config'
import { makeDomainConfig } from '@boon-digital/rocket-admin-config/entity-configs/domains.config'

export { makeContactConfig, makeCompanyConfig, makeHotelConfig, makeBookingConfig, makeStayConfig, makeDomainConfig }
export type { Contact, Company, Hotel, Booking, Stay, Domain } from '@boon-digital/rocket-admin-config/entities/types'

// Map from entity key to config factory — add new entities here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configFactories: Record<EntityKey, () => EntityConfig<any>> = {
  contacts: makeContactConfig,
  companies: makeCompanyConfig,
  hotels: makeHotelConfig,
  bookings: makeBookingConfig,
  stays: makeStayConfig,
  domains: makeDomainConfig,
}
