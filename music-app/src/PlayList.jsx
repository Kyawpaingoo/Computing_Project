import React from "react";
import './App.css'
import './index.css'
import { PencilIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const Playlist = ( ) => {
  const tableHead = [
    "Play","Title", "Artist(s)", "Album", "Duration", ""
  ]
  const staticData = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist Name 1",
      album: "Album Name 1",
      duration: "2 mins"
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist Name 2",
      album: "Album Name 2",
      duration: "2 mins"
    },
    {
        id: 3,
        title: "Song Title 3",
        artist: "Artist Name 3",
        album: "Album Name 3",
        duration: "1 mins"
    },
    {
        id: 4,
        title: "Song Title 4",
        artist: "Artist Name 4",
        album: "Album Name 4",
        duration: "2 mins"
    },
    {
      id: 5,
      title: "Song Title 5",
      artist: "Artist Name 5",
      album: "Album Name 5",
      duration: "2 mins"
  },
  {
    id: 6,
    title: "Song Title 6",
    artist: "Artist Name 6",
    album: "Album Name 6",
    duration: "2 mins"
  },
  {
    id: 7,
    title: "Song Title 7",
    artist: "Artist Name 7",
    album: "Album Name 7",
    duration: "2 mins"
  },
  {
    id: 8,
    title: "Song Title 8",
    artist: "Artist Name 8",
    album: "Album Name 8",
    duration: "2 mins"
  },
];
  return (
    <Card className="h-full w-full ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h4" className="font-bold" color="blue-gray">
              PlayList: Example
            </Typography>
            <Button color="green" className=" mt-2 flex items-center gap-3" size="sm">
            <Typography variant="h5" color="white">
              Listen On
            </Typography>
              <img src="/src/assets/spotify_icon.png" style={{ width: '25px', height: '25px' }}/>
            </Button>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staticData.map(
              (
                {
                  title,
                  artist,
                  album,
                  duration
                  
                },
                index,
              ) => {
                const isLast = index === staticData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                      <Tooltip content="Play Now">
                        <IconButton variant="text">
                          <PlayCircleIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      </div>
                     
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar
                          src={img}
                          alt={title}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        /> */}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {title}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {artist}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {album}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {duration}
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td> */}
                    
                    <td className={classes}>
                      <Tooltip content="Save to Spotify PlayList">
                        <IconButton variant="text">
                        <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Playlist;
