<script lang="ts">
	import { gameModes } from '$lib/gameModes';
	import type { RiotAPITypes } from '@fightmegg/riot-api';
	import dayjs from '$lib/helpers';
	let {
		playerData
	}: {
		playerData: {
			account: RiotAPITypes.Account.AccountDTO;
			matches: RiotAPITypes.MatchV5.MatchDTO[];
			recentMatches: RiotAPITypes.MatchV5.MatchDTO[];
			summoner: RiotAPITypes.Summoner.SummonerDTO;
		};
	} = $props();

	function sortByCreationDate(arr: RiotAPITypes.MatchV5.MatchDTO[]) {
		arr.sort((b, a) => {
			if (a.info.gameCreation < b.info.gameCreation) {
				return -1; // a comes before b
			}
			if (a.info.gameCreation > b.info.gameCreation) {
				return 1; // b comes before a
			}
			return 0; // a and b are equal
		});
		return arr;
	}

	export const secondsToHHMMSS = (seconds) => {
		// const HH = `${Math.floor(seconds / 3600)}`.padStart(2, '0');
		const MM = `${Math.floor(seconds / 60) % 60}`.padStart(2, '0');
		const SS = `${Math.floor(seconds % 60)}`.padStart(2, '0');
		return [MM, SS].join(':');
	};

	// Function to find description by gameMode
	function getDescription(gameMode) {
		const match = gameModes.find((mode) => mode.gameMode === gameMode);
		return match ? match.description.replace('games', '').trim() : 'unknown';
	}
</script>

{#snippet accountSummoner(
	account: RiotAPITypes.Account.AccountDTO,
	summoner: RiotAPITypes.Summoner.SummonerDTO
)}
	<div class="flex flex-col items-center py-2">
		<h2 class="flex flex-col text-center text-xl">
			<small>{summoner.summonerLevel}</small>
			<span
				><a href="https://porofessor.gg/live/euw/{account.gameName}-{account.tagLine}">
					{account.gameName}-{account.tagLine}</a
				></span
			>
		</h2>
		<small></small>
	</div>
{/snippet}

<div class="flex h-full flex-col">
	{@render accountSummoner(playerData.account, playerData.summoner)}

	<div class="flex h-full flex-col divide-y-2 divide-gray-800 overflow-auto px-1">
		{#each sortByCreationDate(playerData.matches) as match}
			{@const participant:RiotAPITypes.MatchV5.ParticipantDTO | undefined = match.info.participants.find(
				(item) => item.summonerId === playerData.summoner.id
			)}

			{#if participant}
				<a href={'https://www.leagueofgraphs.com/match/euw/' + match.info.gameId}>
					<div
						class="w-[300px] p-2 {participant.win
							? 'bg-green-400 dark:bg-green-800'
							: 'bg-red-400 dark:bg-red-800'}"
					>
						<div class="flex gap-4">
							<img
								class="aspect-square h-[80px]"
								src={'https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/' +
									participant.championName +
									'.png'}
								alt=""
							/>
							<div class="flex flex-col">
								<div class="text-xl font-semibold">
									{participant.win ? 'Victory' : 'Defeat'}
								</div>
								<div>{dayjs(match.info.gameEndTimestamp).fromNow()}</div>

								<div>{getDescription(match.info.gameMode)}</div>
								<div>{secondsToHHMMSS(match.info.gameDuration)}</div>
							</div>
						</div>
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>
