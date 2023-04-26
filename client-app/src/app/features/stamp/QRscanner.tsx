import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  BrowserQRCodeReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";

import { Button, Container, Input, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default function QrScanner() {
  const { venueStore } = useStore();

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [videoInputDevices, setVideoInputDevices] = useState<any>([]);
  const [qrCode, setQrCode] = useState<string>("");

  const codeReader = useMemo(() => new BrowserQRCodeReader(), []);
  const [activeItem, setActiveItem] = useState("scan");

  const handleItemClick = (e: any, { name }: any) => setActiveItem(name);

  const handleEnterCodeClick = async () => {
    try {
      if (code.length == 0) {
        toast.error("Please input the code.");
      } else {
        const res = await venueStore.stamp(
          `${venueStore.selectedVenue?.id}`,
          code
        );

        if (res == "Success") {
          window.location.href = `https://localhost:3000/venue-list/${venueStore.selectedVenue?.id}`;
        } else {
          toast.error("Please enter a valid code");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    decodeOnce(selectedDeviceId);
    console.log(`Started decode from camera with id ${selectedDeviceId}`);
  }, [selectedDeviceId, activeItem]);

  function decodeOnce(selectedDeviceId: any) {
    codeReader.decodeOnceFromVideoDevice(selectedDeviceId, "video").then(
      async (result) => {
        console.log("Found QR code!", result);
        setQrCode(result.toString());
      },
      (err) => {
        setCode("");

        if (err instanceof NotFoundException) {
          console.log("No QR code found.");
        }

        if (err instanceof ChecksumException) {
          console.log("A code was found, but it's read value was not valid.");
        }

        if (err instanceof FormatException) {
          console.log("A code was found, but it was in a invalid format.");
        }
      }
    );
  }
  useEffect(() => {
    if (qrCode) {
      venueStore.stamp(`${venueStore.selectedVenue?.id}`, qrCode).then(() => {
        window.location.href = `https://localhost:3000/venue-list/${venueStore.selectedVenue?.id}`;
      });
    }
  }, [qrCode]);

  return (
    <Container fluid>
      <Menu tabular>
        <Menu.Item
          name="scan"
          active={activeItem === "scan"}
          onClick={handleItemClick}
        >
          Scan Code
        </Menu.Item>
        <Menu.Item
          name="enter"
          active={activeItem === "enter"}
          onClick={handleItemClick}
        >
          Enter Code
        </Menu.Item>
      </Menu>

      {activeItem === "scan" && (
        <Container fluid>
          <div id="sourceSelectPanel">
            <p className="py-10 text-center text-5xl">Scan qr code</p>
          </div>

          <div className="flex justify-center">
            <video id="video" className="w-full bg-zinc-300 md:w-3/5" />
          </div>
        </Container>
      )}

      {activeItem === "enter" && (
        <Container fluid>
          <div id="sourceSelectPanel">
            <p className="py-10 text-center text-5xl">Enter code</p>
          </div>
          <div className="flex justify-center gap-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              style={{
                cursor: "pointer",
                backgroundColor: "#ed2b5d",
                color: "#ffffff",
              }}
              onClick={handleEnterCodeClick}
            >
              Submit
            </Button>
          </div>
        </Container>
      )}
      <ToastContainer position="bottom-center" />
    </Container>
  );
}
