import React, { useEffect, useState } from 'react';
import moment from 'moment';
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
        if (!initialDate || !initialHour) {
            console.error("Data ou hora inicial não fornecida.");
            setMostrarContador(false);
            return;
        }

        const dataInicial = moment.utc(`${initialDate}T${initialHour}`, moment.ISO_8601);
        console.log(dataInicial)
        // if (!dataInicial.isValid()) {
        //     console.error("Data inicial inválida.");
        //     setMostrarContador(false);
        //     return;
        // }

        // setMostrarContador(true);

        // const interval = setInterval(() => {
        const agora = moment();
        const diff = moment.duration(agora.diff(dataInicial));

        setTempo({
            anos: diff.years(),
            meses: diff.months(),
            dias: diff.days(),
            horas: diff.hours(),
            minutos: diff.minutes(),
            segundos: diff.seconds(),
        });
        // }, 1000);

        // return () => clearInterval(interval);
    }, [initialDate, initialHour]);

    return (
        <div>
            <h1 className='text-white text-center font-semibold'>Juntos há:</h1>
            {initialDate && initialHour && <p className='boujee-text font-semibold text-center text-[16px]'>
                {tempo.anos} anos, {tempo.meses} meses, {tempo.dias} dias, {tempo.horas} horas, {tempo.minutos} minutos e {tempo.segundos} segundos
            </p>}
        </div>
    );
}

export default ContadorEterno;
