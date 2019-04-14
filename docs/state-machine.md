# State Machine

![State Machine](./state-machine.png)

## State:
  - Layout: segmentMap
  - Trains: trainPosition[]
  - Signals: signalState[] 
  
## Action common payload
  - layoutId
  - Timestamp
  - toBroadcast
  
## Actions; Reducers
  - TrainPosition(trainId, segmentId, dir, betweenNextSegment)
    - Updates Trains
  - TrainSpeed(trainId, speed, dir)
    - Updates Trains
    - Updates hardware
  - Switch(switchId, direction)
    - Updates Layout
    - Updates hardware
  - SignalLight(lightId, state)
    - Updates Signals
    - Updates hardware
  - MilestoneHit
  
## Effects
  - MilestoneHit(milestoneId)
    - Trains.forEach(train)
      - If isTrainHit(milestoneId)
        - If isTrainOutside(train)
          - \>TrainPosition(train, segmentId, betweenNextSegment=null)
        - Else
          - If isSignalRed(milestoneId, train.dir)
            - \>TrainSpeed(train, speed=0, train.dir)
            - If (train.segment == unknown)
              - \>TrainPosition(train, segmentId, betweenNextSegment=null)
          - Else
            - \>TrainPosition(train, segmentId, betweenNextSegment)
  - TrainPosition(trainId, segmentId, dir (FW|REV), betweenNextSegment)
    - Layout.segments.ForEach(segment)
      - If isTrainInSegment(trainId, segment)
        - If segment != segmentId
          - getSignalLightsIntoSegment(segment).forEach(signal)
            - \>SignalLight(lightId, green)
        - Else if betweenNextSegment == null
          - getSignalLightsIntoSegment(segment).forEach(signal)
            - \>SignalLight(lightId, red)
        - Else If betweenNextSegment != null
          - getSignalLightsIntoSegment(betweenNextSegment).forEach(signal)
            - \>SignalLight(lightId, red)
