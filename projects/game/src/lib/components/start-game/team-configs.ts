import { IStartTeamConfig, IStartPlayer } from "@gamesbyemail/base";

const gameTitle = "Chinese Checkers Game";
const optionNames = [
  "jumpMultiplier"
];
const players: IStartPlayer[] = [
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  },
  {
    user: undefined
  }
];

export const teamConfigs: IStartTeamConfig[] = [
  {
    title: gameTitle,
    teams: [
      {
        title: "Red",
        player: players[0]
      }, {
        title: "Yellow",
        player: players[1]
      }, {
        title: "Green",
        player: players[2]
      }, {
        title: "Cyan",
        player: players[3]
      }, {
        title: "Blue",
        player: players[4]
      }, {
        title: "Magenta",
        player: players[5]
      }
    ],
    optionNames: optionNames
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Red",
        player: players[0]
      }, {
        title: "Yellow",
        player: players[1]
      }, {
        title: "Green",
        player: players[2]
      }, {
        title: "Cyan",
        player: players[3]
      }, {
        title: "Blue",
        player: players[4]
      }
    ],
    optionNames: optionNames
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Red",
        player: players[0]
      }, {
        title: "Yellow",
        player: players[1]
      }, {
        title: "Cyan",
        player: players[2]
      }, {
        title: "Blue",
        player: players[3]
      }
    ],
    optionNames: optionNames
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Red",
        player: players[0]
      }, {
        title: "Green",
        player: players[1]
      }, {
        title: "Blue",
        player: players[2]
      }
    ],
    optionNames: optionNames
  },
  {
    title: gameTitle,
    teams: [
      {
        title: "Red",
        player: players[0]
      }, {
        title: "Cyan",
        player: players[1]
      }
    ],
    optionNames: optionNames
  }
];