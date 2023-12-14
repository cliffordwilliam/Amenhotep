export default class c {
    static AmenhotepBaseUrl = "https://server.cliffordwilliam.tech";
    static localBaseUrl = "http://localhost:3000";
    static localFrontEndBaseUrl = "http://localhost:5173";
    static spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=c427c4dced8b46f092bea016eb4ab5a0&response_type=code&redirect_uri=${c.localFrontEndBaseUrl}/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
}