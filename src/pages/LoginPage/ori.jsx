import React, { useState } from "react";
import { LoginContent } from "../../components/index.js"
import { DashboardContent } from "../../components/index.js"
const Login = () => {
  const [useDash, setUseDash] = useState(true);
  return (
    <>
      {/* <div onClick={() => { setUseDash(!useDash) }} style={{
        position: "fixed", top: '0', height: "10dvh", width: "calc(100dvw - (100dvw - 100%))",
        backgroundColor: "#14152133",
        backdropFilter: "blur(40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        클릭시 dashboard / login
      </div> */}
      {
        useDash ? <DashboardContent /> : <LoginContent />
      }

    </>
  );
};

export default Login;

