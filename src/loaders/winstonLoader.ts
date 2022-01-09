import { MicroframeworkLoader, MicroframeworkSettings } from "microframework-w3tec";
import { configure, format, transports } from "winston";

export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    configure({
        transports: [
            new transports.Console({
                level: process.env.LOG_LEVEL,
                handleExceptions: true,
                format: process.env.NODE_ENV !== "development"
                    ? format.combine(
                        format.json()
                    )
                    : format.combine(
                        format.colorize(),
                        format.simple()
                    ),
            }),
        ],
    });
};
