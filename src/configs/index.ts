import type { EntityKey } from '@ruben/admin-template-config/registry'
import type { EntityConfig } from '@ruben/admin-template-config/entity-configs'
import { makeContactConfig } from '@ruben/admin-template-config/entity-configs/contacts.config'
import { makeCompanyConfig } from '@ruben/admin-template-config/entity-configs/companies.config'
import { makeHotelConfig } from '@ruben/admin-template-config/entity-configs/hotels.config'
import { makeBookingConfig } from '@ruben/admin-template-config/entity-configs/bookings.config'
import { makeStayConfig } from '@ruben/admin-template-config/entity-configs/stays.config'

export { makeContactConfig, makeCompanyConfig, makeHotelConfig, makeBookingConfig, makeStayConfig }
export type { Contact, Company, Hotel, Booking, Stay } from '@ruben/admin-template-config/entities/types'

// Map from entity key to config factory — add new entities here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configFactories: Record<EntityKey, () => EntityConfig<any>> = {
  contacts: makeContactConfig,
  companies: makeCompanyConfig,
  hotels: makeHotelConfig,
  bookings: makeBookingConfig,
  stays: makeStayConfig,
}
