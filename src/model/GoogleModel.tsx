
declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (input: IdConfiguration) => void
                    prompt: (
                        momentListener: (res: PromptMomentNotification) => void
                    ) => void
                    renderButton: (
                        parent: HTMLElement,
                        options: GsiButtonConfiguration,
                    ) => void
                }
            }
        }
    }

}

export interface IdConfiguration {
    client_id: string
    callback: (handleCredentialResponse: CredentialResponse) => void
}

export interface CredentialResponse {
    credential?: string
    clientId?: string
}

export interface GsiButtonConfiguration {
    type: "standard" | "icon"
    theme?: "outline" | "filled_blue" | "filled_black"
    size?: "large" | "medium" | "small"
    text?: "signin_with" | "signup_with" | "continue_with" | "signup_with"
    shape?: "rectangular" | "pill" | "circle" | "square"
    logo_alignment?: "left" | "center"
    width?: string
    local?: string
}

export interface PromptMomentNotification {
    isDisplayMoment: () => boolean
    isDisplayed: () => boolean
}

export interface GoogleCredentialModel {
    aud: string
    azp: string
    email: string
    email_verified: string
    exp: number
    family_name: string
    given_name: string
    iat: number
    iss: number
    jti: string
    name: string
    nbf: string
    picture: string
    sub: string
}