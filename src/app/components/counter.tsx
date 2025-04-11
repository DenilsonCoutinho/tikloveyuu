import React, { useEffect, useState } from 'react';
import moment from 'moment';
interface CountProps {
    initialDate: string | undefined; // Data inicial
    initialHour: string | undefined; // Hora inicial
}

function ContadorEterno({ initialDate, initialHour }: CountProps) {
    const [tempo, setTempo] = useState({
        anos: 0,
        meses: 0,
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
      });
    
      useEffect(() => {
        if (!initialDate || !initialHour) {
          console.error("Data ou hora inicial não fornecida.");
          return;
        }
    
        const dataInicial = moment(`${initialDate}T${initialHour}`, "YYYY-MM-DDTHH:mm");
        if (!dataInicial.isValid()) {
          console.error("Data inicial inválida.");
          return;
        }
    
        const atualizarContador = () => {
          const agora = moment();
    
          // Calcula as diferenças
          const diffAnos = agora.diff(dataInicial, "years");
          const diffMeses = agora.diff(dataInicial, "months") % 12; // Resto da divisão para meses
          const diffDias = agora.diff(dataInicial.clone().add(diffAnos, "years").add(diffMeses, "months"), "days");
    
          const diffHoras = agora.hours() - dataInicial.hours();
          const diffMinutos = agora.minutes() - dataInicial.minutes();
          const diffSegundos = agora.seconds() - dataInicial.seconds();
    
          setTempo({
            anos: diffAnos,
            meses: diffMeses,
            dias: diffDias,
            horas: diffHoras < 0 ? diffHoras + 24 : diffHoras,
            minutos: diffMinutos < 0 ? diffMinutos + 60 : diffMinutos,
            segundos: diffSegundos < 0 ? diffSegundos + 60 : diffSegundos,
          });
        };
    
        // Atualiza o contador a cada segundo
        const interval = setInterval(atualizarContador, 1000);
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
      }, [initialDate, initialHour]);

    return (
        <div>
            <h1 className='text-white text-center font-semibold'>Juntos há:</h1>
            {initialDate && initialHour && <p className='boujee-text font-medium text-center text-[21px]'>
                {tempo.anos} {tempo.anos > 1 ? "anos" : "ano"}, {tempo.meses} {tempo.meses > 1 ? "meses" : "mês"} , {tempo.dias} dias, {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos} segundos
            </p>}
        </div>
    );
}

export default ContadorEterno;
