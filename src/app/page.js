'use client'
import React, { useState } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';

const Home = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [captchaValidated, setCaptchaValidated] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);

  const handleCanvasSubmit = (dataUrl) => {
    if (dataUrl) {
      console.log('Captcha passed');
      setCaptchaValidated(true);
    } else {
      console.log('Captcha failed');
    }
  };

  const handleCaptchaFail = () => {
    console.log('Captcha failed - nothing on canvas');
    setCaptchaFailed(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Drawing Canvas CAPTCHA</h1>
      <button
        onClick={() => {
          setShowCanvas(!showCanvas);
          setCaptchaValidated(false);
          setCaptchaFailed(false);
        }}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-6"
      >
        {showCanvas ? 'Hide Canvas' : 'Show Canvas'}
      </button>
      {showCanvas && (
        <DrawingCanvas onSubmit={handleCanvasSubmit} onFail={handleCaptchaFail} />
      )}
      {captchaValidated && (
        <p className="mt-4 text-green-600">CAPTCHA passed! You are a human!</p>
      )}
      {captchaFailed && (
        <p className="mt-4 text-red-600">You failed the CAPTCHA. Try again!</p>
      )}
    </div>
  );
};

export default Home;
