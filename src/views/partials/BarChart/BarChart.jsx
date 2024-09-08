import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import style from "./BarChart.module.css";

export const BarChart = () => {
    const [max, setMax] = useState(-1);
    let [meals_data, setMealData] = useState([
        {
            popularity: 90,
            name: "Egyptian Falafel (Tamiya)",
        },
        {
            popularity: 90,
            name: "meal 123456789",
        },
        {
            popularity: 90,
            name: "meal 1",
        },
        {
            popularity: 90,
            name: "meal 1",
        },
        {
            popularity: 90,
            name: "meal 1",
        },
        {
            popularity: 501,
            name: "meal 2",
        },
        {
            popularity: 400,
            name: "meal 3",
        },
        {
            popularity: 250,
            name: "meal 4",
        },
        {
            popularity: 160,
            name: "meal 5",
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

    const Name_Dots_Adder = (name, gap_size) => {
        if (name.length > gap_size / 5) {
            let length = Math.ceil(gap_size / 5) - 3;
            return name.slice(0, length) + "...";
        } else return name;
    };

    const calculate_MAX = () => {
        if (max == -1) {
            let MAX_VAL = meals_data.reduce((accumulator, currentValue) => {
                return Math.max(accumulator, currentValue.popularity);
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
        // Math.max(
        //     canvasParentRef.current.clientWidth - Safe_Area,
        //     700
        // );
        canvas.height = Math.max(
            canvasParentRef.current.clientHeight - Safe_Area,
            window.innerHeight / 3
        );

        const Paddings_Area = {
            x: 0, //Math.max(canvas.width / 15, max.toString().length * 15)
            y: canvas.width / 35,
        };
        const gap_size =
            (canvas.width - Paddings_Area.x) / (2 * meals_data.length + 1);

        const Vertical_Draw_Area = {
            min: 0,
            max: canvas.height - Paddings_Area.y - 50,
        };

        // Clear view for each draw
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Bars
        Bars_Drawer(
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
    const Bars_Drawer = (
        gap_size,
        Paddings_Area,
        Vertical_Draw_Area,
        canvas,
        context
    ) => {
        meals_data.forEach((meal, idx) => {
            context.fillStyle = themeColors[themeType].theme;
            context.fillRect(
                Paddings_Area.x + (2 * idx + 1) * gap_size,
                canvas.height -
                    Paddings_Area.y -
                    drawing_View_Scale(meal.popularity, Vertical_Draw_Area),
                gap_size * 1.5,
                drawing_View_Scale(meal.popularity, Vertical_Draw_Area)
            );
            context.font = "16px monospace";
            context.textAlign = "center";
            context.fillStyle = themeColors[themeType].text;
            context.fillText(
                Name_Dots_Adder(meal.name.toUpperCase(), gap_size),
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
        for (let i = 4; i >= 1; i--) {
            const value = max * (i / 4);
            let y =
                canvas.height -
                drawing_View_Scale(value, Vertical_Draw_Area) -
                Paddings_Area.y;
            context.textAlign = "center";
            context.fillText(Math.floor(value), 20, y - 10);

            context.strokeStyle = `${themeColors[themeType].text}30`;
            context.beginPath();
            // Horizontal-Lines
            context.moveTo(Paddings_Area.x, y);
            context.lineTo(canvas.width, y);
            context.stroke();
        }

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
    }, [meals_data, themeType]);
    return (
        <Fragment>
            <div className={style.barchart} ref={canvasParentRef}>
                <canvas ref={canvasRef} />
            </div>
        </Fragment>
    );
};
