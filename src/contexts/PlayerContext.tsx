import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
};

type PlayerProviderProps = {
  children: ReactNode | ReactNode[];
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = useCallback((episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }, []);

  const playList = useCallback((list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prevIsLooping) => !prevIsLooping);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling((prevIsShuffling) => !prevIsShuffling);
  }, []);

  const setPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const hasPrevious = useMemo(
    () => currentEpisodeIndex > 0,
    [currentEpisodeIndex]
  );

  const hasNext = useMemo(
    () => isShuffling || currentEpisodeIndex + 1 < episodeList.length,
    [currentEpisodeIndex, episodeList, isShuffling]
  );

  const playNext = useCallback(() => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(
        (prevCurrentEpisodeIndex) => prevCurrentEpisodeIndex + 1
      );
    }
  }, [hasNext, isShuffling]);

  const playPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(
        (prevCurrentEpisodeIndex) => prevCurrentEpisodeIndex - 1
      );
    }
  }, [hasPrevious]);

  const clearPlayerState = useCallback(() => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        play,
        playList,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
