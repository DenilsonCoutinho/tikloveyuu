import React, { useEffect, useState } from 'react';

interface CountProps {
    initialDate: string | undefined; // Data inicial obrigatória
    initialHour: string | undefined; // Hora inicial obrigatória
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

    // Combine initialDate e initialHour para criar a data inicial
    const dataInicial = new Date(`${initialDate}T${initialHour}`);

    useEffect(() => {
        if (initialDate && initialHour) {
            setMostrarContador(true); // Exibe o contador se as props estiverem disponíveis
            
            const interval = setInterval(() => {
                const agora = new Date();
                
                // Calcula a diferença total em milissegundos
                const diff = Math.abs(agora.getTime() - dataInicial.getTime());
                
                // Converte a diferença para anos, meses, dias, horas, minutos e segundos
                let totalAnos = agora.getFullYear() - dataInicial.getFullYear();
                let totalMeses = agora.getMonth() - dataInicial.getMonth();
                let totalDias = agora.getDate() - dataInicial.getDate();
                let totalHoras = agora.getHours() - dataInicial.getHours();
                let totalMinutos = agora.getMinutes() - dataInicial.getMinutes();
                let totalSegundos = agora.getSeconds() - dataInicial.getSeconds();

                // Ajusta a contagem de horas, minutos e segundos
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

                // Ajuste para dias e meses
                if (totalDias < 0) {
                    totalMeses -= 1;
                    const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
                    totalDias += ultimoDiaDoMesAnterior;
                }

                if (totalMeses < 0) {
                    totalAnos -= 1;
                    totalMeses += 12;
                }

                setTempo({ anos: totalAnos, meses: totalMeses, dias: totalDias, horas: totalHoras, minutos: totalMinutos, segundos: totalSegundos });
            }, 1000);

            return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
        }
    }, [initialDate, initialHour]); // Dependências para garantir que o efeito execute apenas quando as props mudarem

    return (
        <div>
            <h1 className='text-white text-center'>Juntos</h1>
            {mostrarContador && (
                <p className='text-white text-center text-sm'>
                    {tempo.anos} anos, {tempo.meses} meses, {tempo.dias} dias, {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos} segundos
                </p>
            )}
        </div>
    );
};

export default ContadorEterno;
