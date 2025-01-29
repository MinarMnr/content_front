// src/app/auth/error/page.tsx (or in your pages folder if using the `pages` directory)

"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    switch (error) {
      case "CredentialsSignin":
        setErrorMessage("Invalid credentials, please try again.");
        break;
      case "Configuration":
        setErrorMessage(
          "There is a configuration issue with the authentication provider."
        );
        break;
      case "AccessDenied":
        setErrorMessage("You do not have permission to sign in.");
        break;
      case "Verification":
        setErrorMessage("The sign-in link is no longer valid.");
        break;
      default:
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
    }
  }, [error]);

  return (
    <div className="error-page">
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <button onClick={() => router.push("/auth/login")}>
        Go back to login
      </button>
    </div>
  );
};

export default ErrorPage;
