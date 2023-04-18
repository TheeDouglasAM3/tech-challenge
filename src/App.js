import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

import { RoutesApp } from "./routes";
import {UserProvider} from './hooks/UserContext'

const App = () => {

  return <UserProvider><RoutesApp /></UserProvider>;
};

export default App;
