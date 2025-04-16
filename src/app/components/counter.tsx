import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface CountProps {
  initialDate: string | undefined; // Ex: "2025-03-16"
  initialHour: string | undefined; // Ex: "22:00"
}

function ContadorEterno({ initialDate, initialHour }: CountProps) {

  const [anos, setAnos] = useState<number | undefined>()
  const [meses, setMeses] = useState<number | undefined>()
  const [dias, setDias] = useState<number | undefined>()
  const [minutos, setMinutos] = useState<number | undefined>()
  const [segundos, setSegundos] = useState<number | undefined>()
  const [hour, setHour] = useState<number | undefined>()

  useEffect(() => {
    if (!initialDate || !initialHour) {
      console.log("Data ou hora inicial não fornecida.");
      return;
    }

    // ✨ Limpa e prepara a data e hora
    const safeDate = initialDate.trim().split("T")[0]; // remove 'T' se existir
    const safeHour = initialHour.trim().substring(0, 5); // pega só "HH:mm"
    const dataFormatada = `${safeDate} ${safeHour}`; // ex: "2025-03-16 22:00"

    // Usa UTC-3 para garantir mesmo fuso horário
    const dataInicial = moment(dataFormatada, "YYYY-MM-DD HH:mm").utcOffset(-3);

    if (!dataInicial.isValid()) {
      console.log("Data inválida após formatação:", dataFormatada);
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

      // setTempo({
      //   anos: diffAnos,
      //   meses: diffMeses,
      //   dias: diffDias,
      //   horas: diffHoras,
      //   minutos: diffMinutos,
      //   segundos: diffSegundos,
      // });
      setAnos(diffAnos)
      setMeses(diffMeses)
      setDias(diffDias)
      setHour(diffHoras)
      setMinutos(diffMinutos)
      setSegundos(diffSegundos)
    };
    const interval = setInterval(atualizarContador, 1000);
    return () => {
      setAnos(anos)
      setMeses(meses)
      setDias(dias)
      setHour(hour)
      setMinutos(minutos)
      setSegundos(segundos)
      clearInterval(interval)
    };
  }, [initialDate, initialHour]);
  return (
    <>
      {
       anos && <div className='notranslate'>
          <h1 className="text-white text-center font-semibold">Juntos há:</h1>
          <p className="boujee-text font-semibold text-center text-[19px]">
            {anos && anos} {anos && anos === 1 ? "ano" : "anos"},{" "}
            {meses && meses} {meses && meses === 1 ? "mês" : "meses"},{" "}
            {dias && dias} {dias && dias === 1 ? "dia" : "dias"},{" "}
            {hour && hour} horas, {minutos} minutos e {segundos} segundos
          </p>
        </div>
      }
    </>
  );
}

export default ContadorEterno;
