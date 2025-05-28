export const matchesDataDB = new Map();

export function getMatchesData(userid: string) {

    if (!matchesDataDB.get(userid)) {

        matchesDataDB.set(userid, {});
    }

    return matchesDataDB.get(userid);
}

export function createMatchesData(userid: string, matchesData: any) {
    if (matchesData === '') {
        throw new Error('createMatchesData');
    }

    matchesDataDB.set(userid, matchesData)
}
