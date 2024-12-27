import React, { useEffect, useState } from 'react';

interface Tempo {
    anos: number;
    meses: number;
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
  }
interface CountProps {
    initialDate: string | undefined; // Data inicial obrigatória
    initialHour: string | undefined; // Hora inicial obrigatória
}

function ContadorEterno({ initialDate, initialHour }: CountProps) {
    const [mostrarContador, setMostrarContador] = useState<boolean>(false);
  const [tempo, setTempo] = useState<Tempo>({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  // Combine initialDate e initialHour para criar a data inicial em UTC
  const dataInicial = new Date(`${initialDate}T${initialHour}Z`);

  useEffect(() => {
    if (initialDate && initialHour) {
      setMostrarContador(true); // Exibe o contador se as props estiverem disponíveis

      const interval = setInterval(() => {
        const agora = new Date();

        // Calcula a diferença total em milissegundos
        const diff = agora.getTime() - dataInicial.getTime();

        // Inicializa valores com a diferença absoluta
        let totalAnos = agora.getUTCFullYear() - dataInicial.getUTCFullYear();
        let totalMeses = agora.getUTCMonth() - dataInicial.getUTCMonth();
        let totalDias = agora.getUTCDate() - dataInicial.getUTCDate();
        let totalHoras = agora.getUTCHours() - dataInicial.getUTCHours();
        let totalMinutos = agora.getUTCMinutes() - dataInicial.getUTCMinutes();
        let totalSegundos = agora.getUTCSeconds() - dataInicial.getUTCSeconds();

        // Ajusta a contagem de segundos e minutos
        if (totalSegundos < 0) {
          totalMinutos -= 1;
          totalSegundos += 60;
        }

        if (totalMinutos < 0) {
          totalHoras -= 1;
          totalMinutos += 60;
        }

        // Ajusta a contagem de horas e dias
        if (totalHoras < 0) {
          totalDias -= 1;
          totalHoras += 24;
        }

        // Ajusta a contagem de dias e meses
        if (totalDias < 0) {
          totalMeses -= 1;
          const ultimoDiaDoMesAnterior = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            0
          ).getUTCDate();
          totalDias += ultimoDiaDoMesAnterior;
        }

        // Ajusta a contagem de meses e anos
        if (totalMeses < 0) {
          totalAnos -= 1;
          totalMeses += 12;
        }

        // Atualiza o estado com os valores calculados
        setTempo({
          anos: totalAnos,
          meses: totalMeses,
          dias: totalDias,
          horas: totalHoras,
          minutos: totalMinutos,
          segundos: totalSegundos,
        });
      }, 1000);

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }
  }, [initialDate, initialHour]); // Dependências para garantir que o efeito execute apenas quando as props mudarem

    return (
        <div>
            <h1 className='text-white text-center font-semibold'>Juntos há:</h1>
            {mostrarContador && (
                <p className='boujee-text font-medium text-center text-[16px]'>
                    {tempo.anos} anos, {tempo.meses} meses, {tempo.dias} dias, {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos} segundos
                </p>
            )}
        </div>
    );
};

export default ContadorEterno;
