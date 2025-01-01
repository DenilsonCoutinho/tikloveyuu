import React, { useEffect, useState } from 'react';

interface CountProps {
    initialDate: string | undefined; // Data inicial
    initialHour: string | undefined; // Hora inicial
}

function ContadorEterno({ initialDate, initialHour }: CountProps) {
    const [mostrarContador, setMostrarContador] = useState<boolean>(false);
    const [tempo, setTempo] = useState<{ anos: number; meses: number; dias: number; horas: number; minutos: number; segundos: number }>({
        anos: 0,
        meses: 0,
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
    });

    useEffect(() => {
        // Validação das props
        if (!initialDate || !initialHour) {
            console.error("Data ou hora inicial não fornecida.");
            setMostrarContador(false);
            return;
        }

        // Criação da data inicial
        const dataInicial = new Date(`${initialDate}T${initialHour}`);
        if (isNaN(dataInicial.getTime())) {
            console.error("Data inicial inválida.");
            setMostrarContador(false);
            return;
        }

        setMostrarContador(true);

        // Atualização do contador a cada segundo
        const interval = setInterval(() => {
            const agora = new Date();

            // Diferença total em milissegundos
            let totalAnos = agora.getFullYear() - dataInicial.getFullYear();
            let totalMeses = agora.getMonth() - dataInicial.getMonth();
            let totalDias = agora.getDate() - dataInicial.getDate();
            let totalHoras = agora.getHours() - dataInicial.getHours();
            let totalMinutos = agora.getMinutes() - dataInicial.getMinutes();
            let totalSegundos = agora.getSeconds() - dataInicial.getSeconds();

            // Ajusta a contagem de segundos, minutos e horas
            if (totalSegundos < 0) {
                totalMinutos -= 1;
                totalSegundos += 60;
            }

            if (totalMinutos < 0) {
                totalHoras -= 1;
                totalMinutos += 60;
            }

            if (totalHoras < 0) {
                totalDias -= 1;
                totalHoras += 24;
            }

            // Ajusta dias e meses
            if (totalDias < 0) {
                totalMeses -= 1;
                const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
                totalDias += ultimoDiaDoMesAnterior;
            }

            if (totalMeses < 0) {
                totalAnos -= 1;
                totalMeses += 12;
            }

            setTempo({
                anos: totalAnos,
                meses: totalMeses,
                dias: totalDias,
                horas: totalHoras,
                minutos: totalMinutos,
                segundos: totalSegundos,
            });
        }, 1000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, [initialDate, initialHour]);

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
}

export default ContadorEterno;
