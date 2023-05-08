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
      [0, canvas.height],
      [canvas.width / 2, canvas.height / 2 + 100],
      [canvas.width / 2, canvas.height / 2 - 100],
      [canvas.width, 0],
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const x = cubicBezier(controlPoints, t)[0] - image.width / 4;
      const y = cubicBezier(controlPoints, t)[1] - image.height / 4;
      ctx.drawImage(image, x, y, image.width / 2, image.height / 2);

      // Desenha a linha vermelha fixa na parte inferior esquerda do canvas
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4;

      // Desenha a curva de Bezier que acompanha a animação da imagem
      const bezierControlPoints = [
        [0, canvas.height],
        [controlPoints[0][0] + (controlPoints[1][0] - controlPoints[0][0]) / 2, controlPoints[1][1] + (canvas.height - controlPoints[1][1]) / 2],
        [controlPoints[2][0] + (controlPoints[3][0] - controlPoints[2][0]) / 2, controlPoints[2][1] - (controlPoints[2][1] - 0) / 2],
        [canvas.width, 0],
      ];
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      const curvePoints = [];
      for (let i = 0; i <= steps; i++) {
        const bezierT = i / steps;
        const point = cubicBezier(bezierControlPoints, bezierT);
        ctx.lineTo(point[0], point[1]);
        curvePoints.push(point);
      }
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


  // Função para calcular o ponto em uma curva de Bézier cúbica para um valor de tempo t (entre 0 e 1)
  const cubicBezier = (controlPoints, t) => {
    const x =
      (1 - t) ** 3 * controlPoints[0][0] +
      3 * (1 - t) ** 2 * t * controlPoints[1][0] +
      3 * (1 - t) * t ** 2 * controlPoints[2][0] +
      t ** 3 * controlPoints[3][0];
    const y =
      (1 - t) ** 3 * controlPoints[0][1] +
      3 * (1 - t) ** 2 * t * controlPoints[1][1] +
      3 * (1 - t) * t ** 2 * controlPoints[2][1] +
      t ** 3 * controlPoints[3][1];
    return [x, y];
  };

  return <canvas ref={canvasRef} {...props} />;
};

export { CanvasPlane };
