import {
  IStartGame,
  testMes
} from '@gamesbyemail/base';


export const testData:{[key:string]:IStartGame} = {
  chinesecheckers: {
    title: "Chinese Checkers game",
    teams: [
      {
        title: "Red",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Cyan",
        player: {
          user: undefined
        }
      }
    ],
    options: {}
  },
  jumpMultiplier: {
    title: "Chinese Checkers game",
    teams: [
      {
        title: "Red",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Green",
        player: {
          user: undefined
        }
      },
      {
        title: "Blue",
        player: {
          user: undefined
        }
      }
    ],
    options: {
      jumpMultiplier: true
    }
  }
};
