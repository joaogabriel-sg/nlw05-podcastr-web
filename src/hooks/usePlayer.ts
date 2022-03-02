import { useContext } from "react";

import { PlayerContext } from "@/contexts/PlayerContext";

export const usePlayer = () => useContext(PlayerContext);
