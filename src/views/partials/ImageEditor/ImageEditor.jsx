import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import style from "./ImageEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeftRight,
    faMagnifyingGlass,
    faPalette,
    faPen,
    faUpDown,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";

const [MIN, MAX] = [1, 2];

const ImageEditor = ({
    viewEditor = false,
    propsSetter = () => {},
    fileSetter = () => {},
    name = "",
    data = "",
}) => {
    const [file, setFile] = useState(data);
    const [image, setImage] = useState(data);
    const [showModal, setShowModal] = useState(viewEditor);

    const imageRef = useRef(null);
    const viewerRef = useRef(null);

    // Image Edits Values
    let [horizontal, setHorizontal] = useState(0);
    let [vertical, setVertical] = useState(0);
    let [scale, setScale] = useState(0);
    let [bgColor, setBgColor] = useState("transparent");

    const setFileData = (e) => {
        if (e?.target?.files && e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            fileSetter(e.target.files[0]);
        }
        reset();
    };

    const reset = () => {
        setHorizontal(0);
        setVertical(0);
        setScale(0);
        setBgColor("transparent");
    };

    const saveValues = () => {
        setShowModal(false);
    };

    const calcWidthMovementLimits = () => ({
        width: Math.abs(
            imageRef.current?.getBoundingClientRect().width -
                viewerRef.current?.offsetWidth
        ),
        height: Math.abs(
            imageRef.current?.getBoundingClientRect().height -
                viewerRef.current?.offsetHeight
        ),
    });

    const clipVertical = () => {
        let val = (-1 * (vertical * calcWidthMovementLimits().height)) / 100;
        if (val > 0) return 0;
        else return val;
    };

    const clipHorizontal = () => {
        let val = (-1 * (horizontal * calcWidthMovementLimits().width)) / 100;
        if (val > 0) return 0;
        else return val;
    };

    useEffect(() => {
        propsSetter({
            top: -1 * clipVertical(),
            left: -1 * clipHorizontal(),
            scale: (scale * (MAX - MIN)) / 100 + MIN,
            background: bgColor,
        });
    }, [horizontal, vertical, bgColor, scale]);

    return (
        <Fragment>
            <div className={style.imageEditor}>
                <div className={style.viewer}>
                    <div className={style.viewerContainer}>
                        <img
                            src={image}
                            style={{
                                top: `${clipVertical()}px`,
                                left: `${clipHorizontal()}px`,
                                scale: `${(scale * (MAX - MIN)) / 100 + MIN}`,
                                background: bgColor,
                            }}
                        />
                    </div>
                    <div className={style.buttonCTRLs}>
                        {/* <button
                            type="button"
                            disabled={!file}
                            onClick={() => setShowModal(true)}>
                            <FontAwesomeIcon icon={faPen} />
                        </button> */}
                        <button className={style.upload} type="button">
                            <FontAwesomeIcon icon={faUpload} />

                            <input
                                type="file"
                                name={"profileImage"}
                                id="profileImage"
                                accept="image/png,image/jpeg"
                                onChange={setFileData}
                            />
                        </button>
                    </div>
                </div>

                <div
                    className={
                        style.modal + " " + (showModal ? style.show : "")
                    }>
                    <div
                        className={style.overlay}
                        onClick={() => setShowModal(false)}></div>
                    <div className={style.innerCTRLS}>
                        <div className={style.innerViewer} ref={viewerRef}>
                            <img
                                ref={imageRef}
                                src={image}
                                style={{
                                    top: `${clipVertical()}px`,
                                    left: `${clipHorizontal()}px`,
                                    scale: `${
                                        (scale * (MAX - MIN)) / 100 + MIN
                                    }`,
                                    background: bgColor,
                                }}
                            />
                        </div>
                        <div className={style.inputEditor}>
                            <Input
                                label={"Horizontal"}
                                type="range"
                                min={0}
                                max={100}
                                value={horizontal}
                                measure="%"
                                onChange={(e) => {
                                    setHorizontal(Number(e.target.value));
                                }}
                                icon={faLeftRight}
                            />
                            <Input
                                label={"Vertical"}
                                type="range"
                                min={0}
                                max={100}
                                value={vertical}
                                measure="%"
                                onChange={(e) => {
                                    setVertical(Number(e.target.value));
                                }}
                                icon={faUpDown}
                            />
                            <Input
                                label={"zoom"}
                                type="range"
                                min={0}
                                max={100}
                                value={scale}
                                measure="%"
                                onChange={(e) => {
                                    setScale(Number(e.target.value));
                                }}
                                icon={faMagnifyingGlass}
                            />
                            <Input
                                label={"background color"}
                                type="color"
                                value={bgColor}
                                measure="deg"
                                onChange={(e) => {
                                    setBgColor(e.target.value);
                                }}
                                icon={faPalette}
                            />
                        </div>

                        <div className={style.saveCTRLS}>
                            <button type="button" onClick={saveValues}>
                                save
                            </button>
                            <button type="button" onClick={reset}>
                                reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ImageEditor;
