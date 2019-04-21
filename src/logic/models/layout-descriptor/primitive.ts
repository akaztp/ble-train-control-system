export enum Primitive {
  Straight = 0, // horizontal
  Diagonal = 1, // from top/middle to middle/left
  SwitchLeft = 2, // one end at left, two ends at right
  SwitchRight = 3, // one end at left, two ends at right
  SignalLight = 4, // above middle facing left
  TrainPresence = 5, // middle
}
