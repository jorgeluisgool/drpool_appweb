// import React, { useEffect, useRef } from 'react'

// export const AlbercaDraw = () => {

//     const canvasRef = useRef(null)
//     const alto = 300;
//     const ancho = 500;
//     const profundidadMinima = 100;
//     const profundidadMaxima = 200;

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const altoFigura = alto >= 200 ? 200 : alto;
//         const anchoFigura = ancho >= 500 ? 500 : ancho;
    
//         // Limpiar el canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Dibujar el rectángulo de la orilla
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // Color nregro para la orilla
//         ctx.fillRect(5, 5, anchoFigura - 10, altoFigura - 10);
    
    
//         // Dibujar la alberca transparente
//         ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Azul transparente
//         ctx.fillRect(10, 10, anchoFigura - 20, altoFigura - 20);
    
//         // Dibujar las medidas
//         ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Color negro para las medidas
//         ctx.font = '14px sans-serif';
//         ctx.fillText(`Ancho: ${ancho} m`, anchoFigura / 2 - 60, altoFigura + 20);
//         ctx.fillText(`Alto: ${alto} m`, anchoFigura + 10, altoFigura / 2);
//       }, [alto, ancho]);
      
//   return (
//     <>
//         <div>AlbercaDraw</div>
//         <canvas ref={canvasRef} width={ancho + 100} height={alto + 100}></canvas>
//     </>
    
//   )
// }


import React, { useRef, useEffect, useState } from 'react';

export const AlbercaDraw = () => {
    const canvasRef = useRef(null)
    const largo = 200;
    const ancho = 100;
    const profundidadMinima =50;
    const profundidadMaxima = 50;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Profundidad minima izquierda
        ctx.strokeStyle = 'black'; // Color de la línea
        ctx.lineWidth = 2; // Grosor de la línea
        ctx.beginPath();
        ctx.moveTo(20, 20); // Punto inicial (x, y)
        ctx.lineTo(20, profundidadMinima); // Punto final (x, y)
        ctx.stroke(); // Dibujar la línea

        //Ancho profundidad minima
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(20, profundidadMinima); 
        ctx.lineTo(ancho, profundidadMinima + ancho); 
        ctx.stroke();
        
        //Ancho izquierda
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(20, 20); 
        ctx.lineTo(ancho, ancho); 
        ctx.stroke();

        //Largo
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(ancho, ancho); 
        ctx.lineTo(largo + ancho, ancho); 
        ctx.stroke();

        //Profundidad minima derecha
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(ancho, ancho); 
        ctx.lineTo(ancho, profundidadMinima + ancho); 
        ctx.stroke();

        //Largo/profundo
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(ancho, profundidadMinima + ancho); 
        ctx.lineTo(largo + ancho, profundidadMaxima+ancho); 
        ctx.stroke();

        //Largo arriba
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(20, 20); 
        ctx.lineTo(largo, 20); 
        ctx.stroke();

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(largo, 20); 
        ctx.lineTo(largo, ancho); 
        ctx.stroke();

        //Ancho derecha
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(largo, 20); 
        ctx.lineTo(largo + ancho, ancho); 
        ctx.stroke();

        //Profundidad maxima
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
        ctx.beginPath();
        ctx.moveTo(largo + ancho, ancho); 
        ctx.lineTo(largo + ancho, profundidadMaxima + ancho); 
        ctx.stroke();

        

      }, [largo, ancho]);

  return (
    <>
      <div>AlbercaDraw</div>
      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </>
  );
};