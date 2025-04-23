import React, { useState } from "react";
import { QrReader } from 'react-qr-reader';
import { scanQRCode } from "../utils/api";

const QrScanner = () => {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const handleScan = async (data) => {
    if (data && data !== result) {
      setResult(data);
      try {
        const res = await scanQRCode(data);
        setStatus(res.data.message);
      } catch (err) {
        setStatus("Failed to update record");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setStatus("Camera error");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">QR Code Scanner</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {result && <p>Scanned: {result}</p>}
      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default QrScanner;
