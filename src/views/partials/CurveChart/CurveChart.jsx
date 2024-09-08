import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import style from "./CurveChart.module.css";

export const CurveChart = () => {
    const [max, setMax] = useState(-1);
    let [data, setData] = useState([
        {
            usersCount: 90,
            date: "10 jan",
        },
        {
            usersCount: 180,
            date: "20 jan",
        },
        {
            usersCount: 50,
            date: "3 feb",
        },
        {
            usersCount: 90,
            date: "5 feb",
        },
        {
            usersCount: 190,
            date: "10 feb",
        },
        {
            usersCount: 1000,
            date: "20 feb",
        },
    ]);
    const themeType = useSelector((store) => store.theme) ? 0 : 1;
    let canvasRef = useRef(null);
    let canvasParentRef = useRef(null);

    let themeColors = [
        {
            theme: "#47a8f3",
            secondary: "#1b1b2b",
            third: "#2d3441",
            text: "#ffffff",
        },
        {
            theme: "#3c78e0",
            secondary: "#eaeaea",
            third: "#d6dada",
            text: "#000000",
        },
    ];

    const calculate_MAX = () => {
        if (max == -1) {
            let MAX_VAL = data.reduce((accumulator, currentValue) => {
                return Math.max(accumulator, currentValue.usersCount);
            }, 0);
            setMax(MAX_VAL);
        }
    };

    const drawing_View_Scale = (value, DrawArea, maxVal = max) => {
        let val =
            (value / maxVal) * Math.abs(DrawArea.max - DrawArea.min) +
            DrawArea.min;
        return val;
    };

    const drawInCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const Safe_Area = 30;
        canvas.width = canvasParentRef.current.clientWidth - Safe_Area;
        canvas.height = Math.max(
            canvasParentRef.current.clientHeight - Safe_Area,
            window.innerHeight / 3
        );

        const Paddings_Area = {
            x: 0,
            y: 50,
        };
        const gap_size =
            (canvas.width - Paddings_Area.x) / (2 * data.length + 1);

        const Vertical_Draw_Area = {
            min: 0,
            max: canvas.height - Paddings_Area.y - 50,
        };

        // Clear view for each draw
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Bars
        Curve_Drawer(
            gap_size,
            Paddings_Area,
            Vertical_Draw_Area,
            canvas,
            context
        );

        // Draw Coordinates
        Coordinates_Drawer(
            gap_size,
            Paddings_Area,
            Vertical_Draw_Area,
            canvas,
            context
        );
    };

    // Drawer Functions
    const Curve_Drawer = (
        gap_size,
        Paddings_Area,
        Vertical_Draw_Area,
        canvas,
        context
    ) => {
        context.strokeStyle = themeColors[themeType].theme;
        context.lineWidth = 5;

        context.beginPath();
        let last_values = {
            x: Paddings_Area.x + gap_size * 1.5,
            y:
                canvas.height -
                Paddings_Area.y -
                drawing_View_Scale(data[0].usersCount, Vertical_Draw_Area),
        };
        context.moveTo(last_values.x, last_values.y);
        data.forEach((value, idx) => {
            let new_Values = {
                x: Paddings_Area.x + (2 * idx + 1.75) * gap_size,
                y:
                    canvas.height -
                    Paddings_Area.y -
                    drawing_View_Scale(value.usersCount, Vertical_Draw_Area),
            };
            if (idx !== 0) {
                context.strokeStyle = `${themeColors[themeType].theme}`;
                context.bezierCurveTo(
                    last_values.x + 0.25 * gap_size,
                    last_values.y +
                        0.01 *
                            gap_size *
                            (last_values.y - new_Values.y > 0 ? 1 : -1),
                    new_Values.x - 0.25 * gap_size,
                    new_Values.y,
                    new_Values.x,
                    new_Values.y
                );
                context.stroke();

                last_values = new_Values;
            }
            context.font = "16px monospace";
            context.textAlign = "center";
            context.fillStyle = themeColors[themeType].text;
            context.fillText(
                value.date.toUpperCase(),
                Paddings_Area.x + (2 * idx + 1) * gap_size + gap_size / 1.25,
                canvas.height - Paddings_Area.y / 4,
                gap_size * 1.5
            );
        });
    };

    const Coordinates_Drawer = (
        gap_size,
        Paddings_Area,
        Vertical_Draw_Area,
        canvas,
        context
    ) => {
        // coordinates Vertical Numbers & Horizontal Lines
        context.font = "16px  monospace";
        context.fillStyle = `${themeColors[themeType].text}aa`;
        const total_lines = 5;
        for (let i = total_lines; i >= 1; i--) {
            const value = max * (i / total_lines);
            let y =
                canvas.height -
                drawing_View_Scale(value, Vertical_Draw_Area) -
                Paddings_Area.y;
            context.textAlign = "center";
            context.fillText(Math.floor(value), 20, y - 10);

            context.strokeStyle = `${themeColors[themeType].text}30`;
            context.lineWidth = 1;
            context.beginPath();
            // Horizontal-Lines
            context.moveTo(Paddings_Area.x, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }

        // Vertical-Lines
        data.forEach((value, idx) => {
            let new_Values = {
                x: Paddings_Area.x + (2 * idx + 1.75) * gap_size,
                y:
                    canvas.height -
                    Paddings_Area.y -
                    drawing_View_Scale(value.usersCount, Vertical_Draw_Area),
            };

            context.strokeStyle = `${themeColors[themeType].text}30`;
            context.beginPath();
            // Horizontal-Lines
            context.moveTo(new_Values.x, 0);
            context.lineTo(new_Values.x, canvas.height);
            context.stroke();
        });

        // Draw coordinates lines
        context.strokeStyle = themeColors[themeType].text;
        context.fillStyle = themeColors[themeType].text;
        context.beginPath();
        // Y-Coord
        // context.moveTo(Paddings_Area.x, canvas.height - Paddings_Area.y + 1);
        // context.lineTo(Paddings_Area.x, 0);
        // X-Coord
        context.moveTo(Paddings_Area.x, canvas.height - Paddings_Area.y);
        context.lineTo(canvas.width, canvas.height - Paddings_Area.y);
        context.lineCap = "round";
        context.stroke();
    };

    // Run on start
    calculate_MAX();

    useEffect(() => {
        drawInCanvas();
        window.addEventListener("resize", drawInCanvas);
        // return () => window.removeEventListener("resize", drawInCanvas);
    }, [data, themeType]);
    return (
        <Fragment>
            <div className={style.CurveChart} ref={canvasParentRef}>
                <canvas ref={canvasRef} />
            </div>
        </Fragment>
    );
};
