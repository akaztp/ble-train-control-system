# State Machine

![State Machine](./state-machine.png)

State machine diagram (a bit outdated)

## State:
  - Layout: segmentMap
  - Trains: trainPosition[]
  - Signals: signalState[]
  - CurrentDeviceInfo
  
## Action common payload
  - layoutId
  - timestamp
  - sourceId
  
## Actions and Reducers
  - TrainPosition(trainId, segmentId, dir, betweenNextSegment)
    - Updates Trains
  - TrainSpeed(trainId, speed, dir)
    - Updates Trains
  - Switch(switchId, direction, enabled)
    - Updates Layout
  - SignalLight(lightId, state)
    - Updates Signals
  - MilestoneHit
  
 ## Actions Sources
- Actions Source: Milestone Sensor
  - \>MilestoneHit
- Actions Source: Milestone Simulator
  - \>MilestoneHit
- Actions Source: Train Position Reset
  - \>TrainSpeed
  - \>TrainPosition
- Actions Source: BLE Advertisement
  - Dispatch BLE received action
  - Manage repeated received actions by using timestamp
- Actions Source: BLE Connection
  - Dispatch BLE received action, setting sourceId to currentDeviceId

 
## Effects
- Effect: BLE Advertisement
  - Send all Action through BLE Advertising, IF sourceId == currentDeviceId
  - BLE advertisement repeat last action repeatedly at intervals
- Effect: BLE Connection
  - Send all Action through BLE Connection, IF sourceId != connectionDestinationDeviceId
- Effect: Train Actuator
  - TrainSpeed
    - Updates hardware
- Effect: Switch Actuator
  - Switch
    - Updates hardware
- Effect: Signal Light Actuator
  - SignalLight
    - Updates hardware
- Effect: Train Position Calculation
  - Only works if on same device with "Actions Source: Milestone Sensor"
```
On Action: MilestoneHit(milestoneId)
    If isTrainHitted(currentDeviceTrain, milestoneId) && state action source == currentDeviceId
        If isTrainOutside(train)
            >TrainPosition(train, segmentId, betweenNextSegment=null)
        Else
            If isSignalRed(milestoneId, train.dir)
                >TrainSpeed(train, speed=0, train.dir)
                If (train.segment == unknown)
                    >TrainPosition(train, segmentId, betweenNextSegment=null)
            Else
                >TrainPosition(train, segmentId, betweenNextSegment)
```
- Effect: Signal Lights Calculation
```
On Action: TrainPosition(trainId, segmentId, dir (FW|REV), betweenNextSegment)
  Layout.segments.ForEach(segment)
      If isSegmentOccupied(segment) // a train in between segments occupies both
          getSignalLightsIntoSegment(segment).forEach(signal)
              >SignalLight(lightId, red), if it is not already and if owned by current device
      Else
          getSignalLightsIntoSegment(segment).forEach(signal)
              >SignalLight(lightId, green), if it is not already and if owned by current device
```
- Effect: Switch Availability
```
On Action: TrainPosition(trainId, segmentId, dir (FW|REV), betweenNextSegment)
    If betweenNextSegment != null
        Layout.switches.forEach(switch)
            If isSwitchInPath(segmentId, betweenNextSegment)
                >Switch(switch, pos, enabled=false)
            Else
                >Switch(switch, pos, enabled=true)
```
