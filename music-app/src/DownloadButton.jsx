import React, { useState } from "react";
import PropTypes from 'prop-types';
import './App.css'
import './index.css'
import {
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Tooltip} from "@material-tailwind/react";

DownloadButton.propTypes ={
    id: PropTypes.number,
    props: PropTypes.object,
    
}
export default function DownloadButton({id}){
   
    const [song, setSong] = useState(null);
    const handleOpen = (value) => {
                                    
                                    setSong(value);
                                    console.log(song);
                                    };
    return(
        <>
             <Tooltip content={`Save to Spotify PlayList ${id}`}> 
             <button onClick={()=> handleOpen({id})} data-ripple-light="true" data-dialog-target={`dialog-${id}`}
                    className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Open Dialog
            </button> 
                {/* <IconButton data-ripple-light="true" data-dialog-target={`dialog-${id}`} variant="text">
                    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton> */}
            </Tooltip>
            <Dialog open={song} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                    <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                    </DialogBody>
                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={()=> handleOpen(null)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={()=> handleOpen(null)}>
                    <span>Confirm</span>
                </Button>
                </DialogFooter>
            </Dialog>
        </>
       
    );
}
