declare global {
    type Difficulty = "BASIC" | "ADVANCED" | "EXPERT" | "MASTER" | "ULTIMA";
    type Grade =
        | "D"
        | "C"
        | "B"
        | "BB"
        | "BBB"
        | "A"
        | "AA"
        | "AAA"
        | "S"
        | "S+"
        | "SS"
        | "SS+"
        | "SSS"
        | "SSS+";
    type NoteLamp =
        | "NONE"
        | "FULL COMBO"
        | "ALL JUSTICE"
        | "ALL JUSTICE CRITICAL";
    type ClearLamp =
        | "FAILED"
        | "CLEAR"
        | "HARD"
        | "BRAVE"
        | "ABSOLUTE"
        | "CATASTROPHY";

    interface ChartDocument {
        id: string;
        legacyChartID: string;
        data: {
            displayVersion: string;
            inGameID: number;
        };
        difficulty: Difficulty;
        isPrimary: boolean;
        level: string;
        levelNum: number;
        songID: string;
        versions: string[];
    }

    interface SongDocument {
        id: string;
        legacySongID: number;
        title: string;
        altTitles: string[];
        searchTerms: string[];
        artist: string;
        data: {
            duration: number;
            genre: string;
        };
    }

    interface PersonalBest {
        chartID: string;
        userID: number;
        calculatedData: {
            rating: number;
        };
        composedFrom: {
            name: string;
            scoreID: string;
        }[];
        game: string;
        highlight: boolean;
        isPrimary: boolean;
        rankingData: {
            rank: number;
            outOf: number;
            rivalRank: number | null;
        };
        scoreData: {
            score: number;
            judgements: {
                jcrit?: number;
                justice?: number;
                attack?: number;
                miss?: number;
            };
            optional: {
                fast?: number;
                slow?: number;
                maxCombo?: number;
                enumIndexes: {};
            };
            grade: Grade;
            enumIndexes: {
                grade: number;
                noteLamp: number;
                clearLamp: number;
            };
            noteLamp: NoteLamp;
            clearLamp: ClearLamp;
        };
        songID: number;
        timeAchieved?: number;
    }

    /**
     * This is the generic response from the Kamaitachi API in event of a failure.
     */
    export interface UnsuccessfulAPIResponse {
        success: false;
        description: string;
    }

    /**
     * In the event of a successful API request, body is attached onto the request, which contains
     * endpoint-defined information about the response, such as database data.
     */
    export interface SuccessfulAPIResponse<T = unknown> {
        success: true;
        description: string;

        // This isn't ideal, but we need to restrict
        // this to only objects - Record<string, unknown>
        // mandates indexability of the type, which makes
        // it unusable for known objects.
        body: T;
    }

    type KamaitachiAPIResponse<T = unknown> =
        | UnsuccessfulAPIResponse
        | SuccessfulAPIResponse<T>;
}

export {};
