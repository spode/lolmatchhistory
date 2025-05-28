
import { RIOT_API_KEY } from '$env/static/private';
import { RiotAPI, PlatformId, DDragon } from '@fightmegg/riot-api';


const rAPI = new RiotAPI(RIOT_API_KEY);

export const db = new Set();

export async function getAccount(gameName: string, tagLine: string = "EUW") {
    try {

        const account = await rAPI.account.getByRiotId({
            region: PlatformId.EUROPE,
            gameName: gameName.replace(" ", ""),
            tagLine
        });

        return account

    } catch (error) {
        // Handle the error here
        console.error(`error fetching account ${gameName}-${tagLine}`, error.status, error);
        return null; // Or return a default account object.
    }
}

export async function getSummoner(puuid: string) {

    try {

        const summoner = await rAPI.summoner.getByPUUID({
            puuid,
            region: PlatformId.EUW1

        });

        return summoner

    } catch (error) {
        // Handle the error here
        console.error("Error fetching summoner:", error.status, error.statusText);
        return null; // Or return a default account object.
    }
}

export async function getRecentMatches(puuid: string) {

    try {

        const matches = await rAPI.matchV5.getIdsByPuuid({
            puuid,
            cluster: PlatformId.EUROPE
        });

        return matches

    } catch (error) {
        // Handle the error here
        console.error("Error fetching recentmatches:", error.status, error.statusText);
        return null; // Or return a default account object.
    }
}

export async function getMatch(matchId: string) {
    try {

        const match = await rAPI.matchV5.getMatchById({
            matchId,
            cluster: PlatformId.EUROPE
        });

        return match

    } catch (error) {
        // Handle the error here
        console.error("Error fetching match:", error.status, error.statusText);
        return null; // Or return a default account object.
    }
}



// console.log("dddragon loaded");
const ddragon = new DDragon();
export const champs = await ddragon.champion.all();