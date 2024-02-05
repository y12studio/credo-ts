import { OpenId4VciHolderService } from '../OpenId4VciHolderService'
import { OpenID4VCIClient } from '@sphereon/oid4vci-client'
import { JwsService, Logger, ConsoleLogger, LogLevel, W3cCredentialService } from '@credo-ts/core'
import { after, before } from 'node:test';


jest.mock('@sphereon/oid4vci-client', () => ({
  OpenID4VCIClient: {
    fromURI: jest.fn()
      .mockResolvedValueOnce({
        credentialOffer: null
      })
      .mockResolvedValueOnce({
        credentialOffer: {
          credential_offer: {},
        },
        retrieveServerMetadata: jest.fn().mockResolvedValue({
          credentialIssuerMetadata: null,
          issuer: "did:123"
        }),
      })
      .mockResolvedValueOnce({
        credentialOffer: {
          credential_offer: {
            credentials: ["co101"]
          }
        },
        retrieveServerMetadata: jest.fn().mockResolvedValue({
          credentialIssuerMetadata: { credentials_supported: [{id:"co101"}] },
          issuer: "did:123"
        }),
        version: jest.fn(() => 'version123')
      })
  },
}))

describe('OpenId4VciHolderService', () => {
  let logger: Logger
  let w3cCredentialService: W3cCredentialService
  let jwsService: JwsService
  let holderService: OpenId4VciHolderService

  beforeEach(() => {
    logger = new ConsoleLogger(LogLevel.off)
    w3cCredentialService = {} as W3cCredentialService // Mock the W3cCredentialService instance
    jwsService = {} as JwsService // Mock the JwsService instance
    holderService = new OpenId4VciHolderService(logger, w3cCredentialService, jwsService)
  })

  it('should throw error when credential offer is not found', async () => {
    const credentialOffer = 'mockedCredentialOffer'
    await expect(holderService.resolveCredentialOffer(credentialOffer)).rejects.toThrow(
      `Could not resolve credential offer from '${credentialOffer}'`
    )
  })

  it('should throw error when issuer metadata is not found', async () => {
    const credentialOffer = 'mockedCredentialOffer'
    await expect(holderService.resolveCredentialOffer(credentialOffer)).rejects.toThrow(
      `Could not retrieve issuer metadata from 'did:123'`
    )
  })

  //it('some foo test', async () => {
  //  const credentialOffer = 'mockedCredentialOffer'
  //  await expect(holderService.resolveCredentialOffer(credentialOffer)).resolves.toBe({ metadata: 123 })
  //})

})
