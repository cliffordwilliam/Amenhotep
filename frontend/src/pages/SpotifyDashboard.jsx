import SpotifyAPIObserver from "../components/SpotifyAPIObserver";
import {useEffect, useState} from "react"
import { useDispatch } from 'react-redux';
import { APIrequest } from '../Store/apiSlice';
import Player from "../components/Player";


export default function SpotifyDashboard(code) {
    const accessToken = SpotifyAPIObserver(code.code)
    const [search,setSearch] = useState("")
    const [tracks,setTracks] = useState([])
    const [uri,setUri] = useState()
    const dispatch = useDispatch();

    function onTrackClicked(e, uri) {
      e.preventDefault()
      setUri(uri)
    }

    const handleApiRequestComplete = (data, error) => {
      if (data) {
        // Extract relevant information from each track
    const processedTracks = data.tracks.items.map((track) => {
      const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        },
        track.album.images[0]
      );

      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: smallestAlbumImage.url,
      };
    });

    // Set the processed tracks in the state
    setTracks(processedTracks);
      } else {
        // Handle error
        console.log(error);
      }
    };

useEffect(()=>{
  if (!search) return setTracks([])
  if(!accessToken) return
  // how do I search tracks from spotify?
  dispatch(APIrequest({
    method: "GET",
    apiEndpoint: `https://api.spotify.com/v1/search?q=${search}&type=track`,
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    callbackArray: [
      handleApiRequestComplete
    ],
  }));
},[search,accessToken])

  return (
    <>
        {/* <p>{code.code}</p> */}
        <h1>Spotify dashboard</h1>
        <form className="card flex-0">
          <label>
            Search for tracks
            <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
          </label>
        </form>
        {/* Display the search results */}
      {tracks.length > 0 ? (
        <ul className="h-flex">
          {tracks.map((track) => (
            <li className="card" key={track.uri} onClick={(e)=>{onTrackClicked(e, track.uri)}}>
              {track.artist} - {track.title}
              <br />
              <img src={track.albumUrl} alt={`Album cover for ${track.title}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks found</p>
      )}
      <Player accessToken={accessToken} trackUri={uri}/>
    </>
  );
}
