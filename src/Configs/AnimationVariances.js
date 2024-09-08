import { stagger } from "framer-motion";

export const HomeAnimation = {
    route: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                type: "spring",
                damping: 7,
                duration: 3,
                delay: 0.5,
            },
        },
        exit: {
            x: "-100%",
            transition: {
                type: "spring",
                damping: 7,
                duration: 3,
                delay: 0.5,
            },
        },
    },

    img: {
        hidden: { y: 1000, x: 1000, scale: 0 },
        visible: {
            y: 0,
            x: 0,
            scale: [0.5, 0.5, 0.5, 1],
            transition: {
                type: "spring",
                damping: 30,
                duration: 3,
            },
        },
    },

    headline: {
        hidden: { x: "-50%", opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 10,
                duration: 2,
                delay: 0.5,
            },
        },
    },

    text: {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 10,
                duration: 2,
                delay: 1,
            },
        },
    },

    button: {
        hidden: { scale: 0, originX: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                duration: 2,
                delay: 1.5,
            },
        },
        hover: {
            scale: 1.2,
            transition: {
                scale: {
                    yoyo: Infinity,
                    duration: 0.25,
                },
            },
        },
        tap: {
            scale: 0.9,
        },
    },

    popUpCard: {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                duration: 2,
                delay: 1.5,
            },
        },
    },
};

export const GridCards = {
    card: {
        hidden: {
            opacity: 0,
            y: 150,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            y: 300,
            transition: {
                ease: "easeOut",
                duration: 0.25,
                delay: 0.1,
            },
        },
    },
};
