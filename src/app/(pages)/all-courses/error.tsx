"use client"; // Error components must be Client Components

import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // console.error(error); // Log the error for further analysis (Sentry, LogRocket, etc.)
  }, [error]);

  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="text-lg text-red-500 ">
    //     <h2>Something went wrong!</h2>
    //     <p>{error.message}</p>
    //     <button onClick={() => reset()}>Retry</button>{" "}
    //     {/* Reset the error boundary */}
    //   </div>
    // </div>

    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-red-500 ">
        There was an error loading the courses. Please try again later.
      </p>
    </div>
  );
};

export default Error;
