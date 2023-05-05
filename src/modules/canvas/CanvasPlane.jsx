import React, { useEffect, useRef, useState } from "react";

const CanvasPlane = (props) => {
  const canvasRef = useRef(null);
  const image = new Image();
  image.src = "/icons/plane-0.svg";

  const [animationTime, setAnimationTime] = useState(5000); // Tempo de duração da animação (em milissegundos)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let t = 0; // tempo
    const steps = (animationTime / 1000) * 60; // número de etapas para a animação, baseado no tempo de duração e na taxa de atualização do navegador (60 fps)
    const controlPoints = [
      [image.width / 1.7, canvas.height - image.height],
      [canvas.width * 0.8, canvas.height - image.height],
      [canvas.width - 60, 40],
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const x = parabolicBezier(controlPoints, t)[0] - image.width / 3.7;
      const y = parabolicBezier(controlPoints, t)[1] - image.height / 3.7;
      ctx.drawImage(image, x, y, image.width / 1.7, image.height / 1.7);
    
      // Definir os pontos iniciais e finais da linha
      const x1 = 40;
      const y1 = canvas.height - 40;
      const x2 = x + 10;
      const y2 = y + 40;
    
      // Definir os pontos de controle da curva parabólica
      const controlX = (x1 + x2) / 2;
      const controlY = Math.max(y1, y2) * 1.1;
    
      // Definir a cor da linha
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#e50539";
    
      // Iniciar o caminho do desenho
      ctx.beginPath();
    
      // Mover para o ponto inicial da linha
      ctx.moveTo(x1, y1);
    
      // Chamar a função quadraticBezier() para desenhar a curva parabólica
      for (let t = 0; t <= 1; t += 0.01) {
        const [x, y] = quadraticBezier(
          [x1, y1],
          [controlX, controlY],
          [x2, y2],
          t
        );
        ctx.lineTo(x, y);
      }
    
      // Desenhar a linha até o ponto final
      ctx.lineTo(x2, y2);
    
      // Finalizar o desenho
      ctx.stroke();
    
      // Desenha a próxima etapa da animação
      if (t <= 1) {
        requestAnimationFrame(render);
      }
      t += 1 / steps;
    };

    // Inicia a animação
    render();
  }, [animationTime]);

  function parabolicBezier(controlPoints, t) {
    const [p0, p1, p2] = controlPoints;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
    return [x, y];
  }

  function quadraticBezier(p0, p1, p2, t) {
    var pFinal = [];
    var p0_p1 = interpolate(p0, p1, t);
    var p1_p2 = interpolate(p1, p2, t);
    pFinal = interpolate(p0_p1, p1_p2, t);
    return pFinal;
  }
  
  function interpolate(p0, p1, t) {
    var pFinal = [];
    for (var i = 0; i < p0.length; i++) {
      pFinal.push((1 - t) * p0[i] + t * p1[i]);
    }
    return pFinal;
  }

  return <canvas ref={canvasRef} {...props} />;
};

export { CanvasPlane };
