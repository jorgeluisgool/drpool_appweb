import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var hipocloritoSodio = [0, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var midata = {
    labels: meses,
    datasets: [ // Cada una de las líneas del gráfico
        {
            label: 'Hipoclorito de sodio',
            data: hipocloritoSodio,
            tension: 0.3,
            fill : true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.05)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Ácido',
            data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25],
            tension: 0.3,
            fill : true,
            borderColor: 'rgb(100,76,247)',
            backgroundColor: 'rgb(100,76,247, 0.05)',
            pointRadius: 5,
            pointBorderColor: 'rgb(100,76,247)',
            pointBackgroundColor: 'rgb(100,76,247)',
        },
        {
            label: 'Abrillantador',
            data: [18, 29, 60, 54, 10, 30, 25, 35, 17, 25, 14, 35],
            tension: 0.3,
            fill : true,
            borderColor: 'rgb(15,174,48)',
            backgroundColor: 'rgb(15,174,48, 0.05)',
            pointRadius: 5,
            pointBorderColor: 'rgb(15,174,48)',
            pointBackgroundColor: 'rgb(15,174,48)',
        },
        {
            label: 'Gold & Clear',
            data: [54, 24, 67, 51, 39, 52, 60, 30, 27, 45, 35, 35],
            tension: 0.3,
            fill : true,
            borderColor: 'rgb(229,208,35)',
            backgroundColor: 'rgb(229,208,35, 0.05)',
            pointRadius: 5,
            pointBorderColor: 'rgb(229,208,35)',
            pointBackgroundColor: 'rgb(229,208,35)',
        },
    ],
};

var misoptions = {
    scales: {
        y: {
            min: 0,
            title: {
                display: true,
                text: 'Cantidad (kg)', // Etiqueta del eje y
            },
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)' },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    var label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += context.parsed.y + ' kg';
                    return label;
                },
            },
        },
    },
};


export default function LinesChart() {
    return <Line data={midata} options={misoptions}/>
}