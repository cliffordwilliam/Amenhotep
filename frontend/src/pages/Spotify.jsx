import c from "../const";
import SpotifyDashboard from "./SpotifyDashboard";
const code = new URLSearchParams(window.location.search).get("code");

export default function Spotify() {
    return (
        <>
            {code ? <SpotifyDashboard code={code}/> : <a className="btn m" href={"https://accounts.spotify.com/authorize?client_id=c427c4dced8b46f092bea016eb4ab5a0&response_type=code&redirect_uri=https://amenhotep-8ccvf23hu-cliffordwilliams-projects.vercel.app//spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"}>Login With Spotify</a>}
        </>
    )
}
