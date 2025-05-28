import { fail } from '@sveltejs/kit';
import * as matchesDataDB from '$lib/server/matchlists';
import { getAccount, getSummoner, getRecentMatches, getMatch, champs } from '$lib/riotapistuff.js';
import type { RiotAPITypes } from '@fightmegg/riot-api';

let id = "1337"

export function load({ params }) {
    id = params.id ?? "1337"

    return {
        id, matchesDataDB: matchesDataDB.getMatchesData(id), champs
    };
}

export const actions = {
    create: async ({ request }) => {

        const data = await request.formData();
        let description = data.get('summoners')?.toString()

        try {

            if (description) {

                let lines = description.split("\n")
                let players = []

                for (let line of lines) {

                    if (line.length < 5)
                        continue

                    if (!line.includes("#") && !line.includes("-"))
                        line += "-euw"

                    line = line
                        .replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
                        .replace("#", "-")
                        .replace("joined the lobby", "")

                    let [name, tag] = line.split("-")

                    let account = await getAccount(name, tag)
                    if (!account) {
                        console.log("not account");
                        return
                    }

                    let summoner = await getSummoner(account?.puuid)

                    if (!summoner) {
                        console.log("not summoner");
                        return
                    }

                    const recentMatches = await getRecentMatches(summoner.puuid)

                    if (!recentMatches) {
                        console.log("not recentMatches");
                        return
                    }

                    const recent5 = recentMatches.slice(0, 10)

                    let matches: RiotAPITypes.MatchV5.MatchDTO[] = []

                    const promises = [];

                    for (let index = 0; index < recent5.length; index++) {
                        const element = recent5[index];

                        const promise = (async () => {
                            const match = await getMatch(element);
                            if (match)
                                matches.push(match);
                        })();
                        promises.push(promise);
                    }

                    await Promise.all(promises);

                    let thing = { account, summoner, recentMatches, matches }
                    players.push(thing)
                }
                matchesDataDB.createMatchesData(id, { players });

                return lines
            }

        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            });
        }
    },
};
