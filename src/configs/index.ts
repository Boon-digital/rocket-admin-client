import type { EntityKey } from '@boon-digital/rocket-admin-config/registry'
import type { EntityConfig } from '@boon-digital/rocket-admin-config/entity-configs'
import { makeCustomerConfig } from '@boon-digital/rocket-admin-config/entity-configs/customers.config'
import { makeDomainConfig } from '@boon-digital/rocket-admin-config/entity-configs/domains.config'
import { makeServerConfig } from '@boon-digital/rocket-admin-config/entity-configs/servers.config'
import { fetchDomainsByServerId, fetchDomainsByCustomerId } from '@/features/domains/api'

export { makeCustomerConfig, makeDomainConfig, makeServerConfig }
export type { Customer, Domain, Server } from '@boon-digital/rocket-admin-config/entities/types'

// Get domain columns for config
const domainConfig = makeDomainConfig()
const domainColumns = domainConfig.columns ?? []

// Map from entity key to config factory — add new entities here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configFactories: Record<EntityKey, () => EntityConfig<any>> = {
  customers: () => makeCustomerConfig({ fetchDomainsByCustomerId, domainColumns }),
  domains: makeDomainConfig,
  servers: () => makeServerConfig({ fetchDomainsByServerId, domainColumns }),
}
