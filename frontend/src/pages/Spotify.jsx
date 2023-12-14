import c from "../const";
import SpotifyDashboard from "./SpotifyDashboard";
const code = new URLSearchParams(window.location.search).get("code");

export default function Spotify() {
    return (
        <>
            {code ? <SpotifyDashboard code={code}/> : <a href={"https://accounts.spotify.com/authorize?client_id=c427c4dced8b46f092bea016eb4ab5a0&response_type=code&redirect_uri=http://localhost:5173/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"}>Login With Spotify</a>}
        </>
    )
}