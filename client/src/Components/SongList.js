import React, { Fragment, useState } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
var SongList = (id) => {
  var [allSongs, setSongs] = useState([]);
  var [userid, setId] = useState(id.id);

  var getSongList = async (id) => {
    let tableid = "SongTable" + userid;
    var SongTable = document.getElementById(tableid);
    if (SongTable.style.display === "none") {
      SongTable.style.display = "block";
    } else {
      SongTable.style.display = "none";
    }

    try {
      var response = await fetch(
        `https://uf5dnq4e49.execute-api.ap-south-1.amazonaws.com/dev/SongList/${userid}`
      );
      var jsonData = await response.json();
      setSongs(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  async function playSong(key) {
    try {
      await axios
        .get(
          `https://uf5dnq4e49.execute-api.ap-south-1.amazonaws.com/dev/MusicFile/${key}`
        )
        .then((result) => {
          var url = new Audio("data:audio/mpeg;base64," + result.data);
          url.play();
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <button
        className="btn btn-primary"
        data-target={`#id${id}`}
        onClick={getSongList}
      >
        Media
      </button>
      <table className="table" Style="display:none;" id={"SongTable" + id.id}>
        <thead>
          <tr>
            <th colspan="5">Song Name</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {allSongs.map((UserMedia) => (
            <tr key={UserMedia.id}>
              <td>{UserMedia.Song.SongName}</td>
              <td>
                <FaIcons.FaPlay
                  onClick={() => playSong(UserMedia.Song.SongS3Key)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default SongList;
