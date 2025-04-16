import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface CountProps {
  initialDate: string | undefined; // Ex: "2025-03-16"
  initialHour: string | undefined; // Ex: "22:00"
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

    // Usa espaço no lugar de "T" e evita strict mode
    const dataFormatada = `${initialDate} ${initialHour}`; // Ex: "2025-03-16 22:00"
    const dataInicial = moment(dataFormatada, "YYYY-MM-DD HH:mm").utcOffset(-3);

    if (!dataInicial.isValid()) {
      console.error("Data inicial inválida:", dataFormatada);
      return;
    }

    const atualizarContador = () => {
      const agora = moment().utcOffset(-3);

      const diffAnos = agora.diff(dataInicial, "years");
      const diffMeses = agora.diff(dataInicial, "months") % 12;
      const diffDias = agora.diff(dataInicial.clone().add(diffAnos, "years").add(diffMeses, "months"), "days");

      const horaBase = dataInicial.clone().add(diffAnos, "years").add(diffMeses, "months").add(diffDias, "days");
      const diffHoras = agora.diff(horaBase, "hours");
      const diffMinutos = agora.diff(horaBase.clone().add(diffHoras, "hours"), "minutes");
      const diffSegundos = agora.diff(horaBase.clone().add(diffHoras, "hours").add(diffMinutos, "minutes"), "seconds");

      setTempo({
        anos: diffAnos,
        meses: diffMeses,
        dias: diffDias,
        horas: diffHoras,
        minutos: diffMinutos,
        segundos: diffSegundos,
      });
    };

    const interval = setInterval(atualizarContador, 1000);
    return () => clearInterval(interval);
  }, [initialDate, initialHour]);

  return (
    <>
      {initialDate && initialHour && (
        <div>
          <h1 className="text-white text-center font-semibold">Juntos há:</h1>
          <p className="boujee-text font-semibold text-center text-[19px]">
            {tempo.anos} {tempo.anos === 1 ? "ano" : "anos"},{" "}
            {tempo.meses} {tempo.meses === 1 ? "mês" : "meses"},{" "}
            {tempo.dias} {tempo.dias === 1 ? "dia" : "dias"},{" "}
            {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos} segundos
          </p>
        </div>
      )}
    </>
  );
}

export default ContadorEterno;
