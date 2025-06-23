// ErrorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div style={{ padding: "1rem", color: "red" }}>
      <h1 className="text-6xl text-center">Error</h1>
      <h1 className="text-5xl text-center">{error.status === 404 ? "Record Not Found" : "An unexpected error occurred"}</h1>
      {error.data && <pre>{error.data.message}</pre>}
    </div>
  );
}