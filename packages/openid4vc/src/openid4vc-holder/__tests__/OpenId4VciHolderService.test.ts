import { OpenId4VciHolderService } from '../OpenId4VciHolderService'
import { OpenID4VCIClient } from '@sphereon/oid4vci-client'
import { JwsService, Logger, ConsoleLogger, LogLevel, W3cCredentialService } from '@credo-ts/core'

// jest.mock('@sphereon/oid4vci-client', () => ({
//   OpenID4VCIClient: {
//     fromURI: jest.fn()
//       .mockResolvedValueOnce({
//         credentialOffer: null
//       })
//       .mockResolvedValueOnce({
//         credentialOffer: {
//           credential_offer: {},
//         },
//         retrieveServerMetadata: jest.fn().mockResolvedValue({
//           credentialIssuerMetadata: null,
//           issuer: "did:123"
//         }),
//       })
//   },
// }))

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
      'Invalid Credential Offer Request'
    )
  })

  it('should throw error when issuer metadata is not found', async () => {
    const credentialOffer = 'mockedCredentialOffer'
    await expect(holderService.resolveCredentialOffer(credentialOffer)).rejects.toThrow(
      'Invalid Credential Offer Request'
    )
  })
  
  it('should todo', async () => {
    const credentialOffer = 'openid-credential-offer://?credential_offer=%7B%22grants%22%3A%7B%22urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Apre-authorized_code%22%3A%7B%22pre-authorized_code%22%3A%22274082969722869560340124%22%2C%22user_pin_required%22%3Afalse%7D%7D%2C%22credentials%22%3A%5B%22AnimoOpenId4VcPlaygroundSdJwtVcJwk%22%5D%2C%22credential_issuer%22%3A%22https%3A%2F%2Fopenid4vc.animo.id%2Foid4vci%2Fd8d69d5d-8cc2-46ba-848d-d69aadfe0a43%22%7D'
    await expect(holderService.resolveCredentialOffer(credentialOffer)).resolves.toBe({foo:"bar"})
  })

})