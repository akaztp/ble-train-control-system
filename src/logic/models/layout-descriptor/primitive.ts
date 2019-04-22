export enum Primitive {
  Straight = 0, // horizontal
  Corner = 1, // from top/middle to middle/left
  DiagonalL = 2, // from middle/left to next-middle/right
  DiagonalR = 3, // from middle/right to next-middle/left
  SwitchLeft = 4, // one end at left, two ends at right
  SwitchRight = 5, // one end at left, two ends at right
  SignalLight = 6, // horizontal, above middle facing left
  TrainPresence = 7, // middle
}
