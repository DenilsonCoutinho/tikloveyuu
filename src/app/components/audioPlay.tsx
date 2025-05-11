import { useRef } from "react";

export const audioRef = useRef<HTMLAudioElement>(null);
    const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 5000); // Toca por 5 segundos
      }).catch((err) => {
        console.error('Erro ao tentar tocar o áudio:', err);
      });
    }
  };