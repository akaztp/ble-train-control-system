export enum Primitive {
  Straight = 0, // horizontal
  Corner = 1, // from top/middle to middle/left
  Diagonal = 2, // from middle/left to next-middle/right
  SwitchLeft = 3, // one end at left, two ends at right
  SwitchRight = 4, // one end at left, two ends at right
  SignalLight = 5, // horizontal, above middle facing left
  TrainPresence = 6, // middle
}
