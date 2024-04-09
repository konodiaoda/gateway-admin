import React from "react";
import html2canvas from "html2canvas";


export const mountImage = (el: HTMLElement) => {
    return new Promise<HTMLCanvasElement>(resolve => {
        html2canvas(el, {
            useCORS: true,
            allowTaint: true,
        }).then(res => {
            const pngDataURI = res.toDataURL("image/png")
            const rect = el.getBoundingClientRect()
            res.style.position = "fixed"
            res.style.left = rect.left + "px"
            res.style.top = rect.top + "px"
            res.style.zIndex = "999999"
            res.width = rect.width
            res.height = rect.height
            res.style.width = rect.width + 'px'
            res.style.height = rect.height + 'px'
            const context = res.getContext('2d');
            const img = new Image();
            img.src = pngDataURI;
            img.onload = () => {
                context?.drawImage(img, 0, 0);
                setTimeout(() => resolve(res))
            }
        })
    })
}

/**
 * see https://gizma.com/easing/
 */

// START
type Equations = {
    elapsed: number,
    initialValue: number,
    amountOfChange: number,
    duration: number
}

export const easeInOutQuint = ({elapsed, initialValue, amountOfChange, duration}: Equations) => {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
}

export const easeInOutQuart = ({elapsed, initialValue, amountOfChange, duration}: Equations) => {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
}

// END

type MousePosType = {
    canvas: HTMLCanvasElement,
    evt: React.MouseEvent<HTMLElement>
}

export const getMousePos = ({canvas, evt}: MousePosType) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: ((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

export const getMaxRadius = (canvas: HTMLCanvasElement) => {
    return Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
}

export const crop = (canvas: HTMLCanvasElement, initialPosition: React.MouseEvent<HTMLElement>, {reverse = false}) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const {x, y} = getMousePos({canvas, evt: initialPosition});

    const maxRadius = getMaxRadius(canvas);
    return new Promise<HTMLCanvasElement>(resolve => {
        let progress = 0;
        const duration = 60;
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.globalCompositeOperation = reverse ? 'destination-in' : 'destination-out';

        function draw() {
            let radius;
            if (reverse) {
                radius = easeInOutQuint({
                    elapsed: progress,
                    initialValue: maxRadius,
                    amountOfChange: -maxRadius,
                    duration
                });
            } else {
                radius = easeInOutQuart(
                    {
                        elapsed: progress,
                        initialValue: 0,
                        amountOfChange: maxRadius,
                        duration
                    }
                )
            }

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();

            progress++;

            if (progress < duration) {
                requestAnimationFrame(draw);
            } else {
                resolve(canvas);
            }
        }

        draw();
    })
}



