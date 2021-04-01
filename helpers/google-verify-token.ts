const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('874182562468-e61qncpdmhu11orb1pvbklp0a0mlqgig.apps.googleusercontent.com');

export const validarGoogleIDToken = async (token: string) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                '874182562468-5gkrkc1o3hcnmeup92amsvtj1d5qnql3.apps.googleusercontent.com',
                '874182562468-4teuqq0en4473a5njtpi9uk7opebfuri.apps.googleusercontent.com'
            ],

        });
        const payload = ticket.getPayload();

        console.log(payload);

        return {
            nick: payload.name,
            username: payload.name,
            picture: payload.picture,
            email: payload.email,
        }
    } catch (e) {
        console.log(e)
        return null;
    }

}