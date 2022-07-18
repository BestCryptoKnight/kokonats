import { TournamentStatus } from "../consts/gameConfig";
import { kokoTimeStrToDate } from "./stringUtils";
import moment from "moment";

export const getTournamentStatus = (tournamentClass, playableTournament, joinedAlready) => {
  if (playableTournament) {
    if (tournamentClass.type !== 1) return TournamentStatus.playable;
    if (playableTournament.startTime) {
      let startTime = kokoTimeStrToDate(playableTournament.startTime);
      const duration = (playableTournament.durationSecond ?? 0) - (playableTournament.entryBeforeSecond ?? 0);
      const nextDay = moment(moment().add(1, "day").format("YYYY/MM/DD"));
      const diff = startTime.diff(nextDay, "seconds");
      if (duration > diff) {
        startTime = startTime.add(-1, "day");
      }
      const endTime = startTime.add(duration, "seconds");
      const currentTime = moment();
      if (currentTime > endTime) return TournamentStatus.finished;
      else if (currentTime > startTime) {
        if (playableTournament.participantNumber) {
          if (joinedAlready) return TournamentStatus.playable;
          if (playableTournament.participantNumber <= playableTournament.joinPlayersCount) return TournamentStatus.full;
        }
        return TournamentStatus.playable;
      } else return TournamentStatus.notStartedYet;
    } else return TournamentStatus.finished;
  } else {
    if (tournamentClass.startTime) {
      const startTime = kokoTimeStrToDate(tournamentClass.startTime);
      const duration = (tournamentClass.durationSecond ?? 0) - (tournamentClass.entryBeforeSecond ?? 0);
      const endTime = startTime.add(duration, "seconds");
      const currentTime = moment();
      if (currentTime > endTime) return TournamentStatus.finished;
      else if (currentTime > startTime) return TournamentStatus.full;
      else return TournamentStatus.notStartedYet;
    } else return TournamentStatus.finished;
  }
};
