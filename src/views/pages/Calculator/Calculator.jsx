import React, { useState } from "react";
import { Fragment } from "react";
import "./Calculator.css";
import Headline from "views/partials/Headline/Headline";
import Input from "views/partials/Input/Input";
import Selector from "views/partials/Selector/Selector";
import { activity_calc_values, goal_values } from "Configs/constants";
import Print from "Configs/Print";

const Calculator = () => {
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [activity, setActivity] = useState(activity_calc_values[0].value);
    const [gender, setGender] = useState(0);
    const [TDEE, setTDEE] = useState(0);

    // BMR = 10 x weight (kg) + 6.25 x height (cm) - 5 x age (years) + 5
    // TDEE = BMR * (1.2  ||  1.375  ||  1.55  ||  1.725  ||  1.9)
    const calculateTDEE = () => {
        let BMR;

        Print("hello", "world", 123);

        if (Number(gender) === 0)
            BMR =
                10 * Number(weight) +
                6.25 * Number(height) -
                5 * Number(age) +
                5;
        else
            BMR =
                10 * Number(weight) +
                6.25 * Number(height) -
                5 * Number(age) -
                161;

        const TDEE = BMR * activity;
        setTDEE(TDEE.toFixed(0));
    };

    return (
        <Fragment>
            <section className="calculator">
                <Headline
                    headline={"Calory calculator"}
                    quote={"Calculate your required calories per day"}
                />

                <div className="calculatorFORM">
                    <div className="valueView">
                        <p className="value">{TDEE}</p>
                        <p className="measure">Calory/day</p>
                    </div>
                    <div className="inputsContainer">
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"Age"}
                                name={"Age"}
                                post={"YR"}
                                bgColor={"transparent"}
                                onChange={(event) => setAge(event.target.value)}
                            />
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"Height"}
                                name={"height"}
                                post={"CM"}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"weight"}
                                name={"weight"}
                                post={"KG"}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setWeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="frmInput">
                            <Selector
                                name={"activity"}
                                values={activity_calc_values}
                                onChange={(value) => {
                                    setActivity(value);
                                }}
                                bgColor={"inherit"}
                                color={"inherit"}
                                border={"none"}
                            />
                        </div>
                        <div className="frmInput genderSelector">
                            <div className="genderInput">
                                <input
                                    type="radio"
                                    checked={gender == 0}
                                    onChange={() => {}}
                                    onClick={(e) => {
                                        setGender(0);
                                    }}
                                />
                                <span>Male</span>
                            </div>
                            <div className="genderInput">
                                <input
                                    type="radio"
                                    checked={gender == 1}
                                    onChange={() => {}}
                                    onClick={(e) => {
                                        if (e.target.checked) setGender(1);
                                    }}
                                />
                                <span>Female</span>
                            </div>
                        </div>
                        <div className="calculate">
                            <button type="button" onClick={calculateTDEE}>
                                Calculate
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Calculator;
