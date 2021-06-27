import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const BITS_NAME_SPACE = "https://bitsofgood.org/";
const options = {
    providers : [
        Providers.Auth0({
            //TODO:add auth0 connection to provider
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            domain: process.env.AUTH0_DOMAIN,
            authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
            profile(auth0Profile) {
              console.log(auth0Profile);
              return {
                email: auth0Profile.email,
                emailVerified: auth0Profile.email_verified,
                id: auth0Profile.sub,
                image: auth0Profile.picture,
                name: auth0Profile.given_name,
                nickname: auth0Profile.nickname,
                familyName: auth0Profile.family_name,
                roles: auth0Profile[BITS_NAME_SPACE + "roles"],
              }
            },
        })
    ]
}

export default (req, res) => NextAuth(req, res, options)