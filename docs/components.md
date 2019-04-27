# Abstraction

- A train layout is partitioned into *segments* and *inter-segments*. Segments are connected by means of inter-segments.
- Every segment has at most two ends, with a signal light and a milestone/sensor at each end.
- A Train can be in one segment OR a Train can be in two segments connected by an inter-segment.
- Track switches are inside inter-segments only.
- An inter-segment can have several paths, some enabled, other disabled according to its switches positions.  

# Modeled Components

## Segment
- On each end: has one Signal Light
- On each end: has paths to other segment specifying the necessary states of switches

## Switch
- Track switch (or turnout) with two positions
- Two positions
- Commanded only by UI
- Prevents switching if train is in-between segments
- Micro-controlled with BLE Advertising

## Signal Light
- Is a two mutual exclusive LEDs: red and green
- Pertains to exiting one segment
- Set green light, if: next segment is free, red otherwise
- Calculates "next segment" with map, switch positions and trains presences
- Micro-controlled with BLE Advertising

## Track Milestone (excludes Train Sensor component)
- Emitter to signal segment exit and a signal light
- Picked up by Train Drivers that immediately react to signal light state
- Micro-controlled with BLE Advertising
- BLE Advertises the corresponding signal light state, at low power

## Train Sensor (excludes Track Milestone component)
- IR presence sensor
- Communicates state using BLE Advertising

## Train Driver
- Sets the speed/dir of train motor
- Stops when milestone with red signal is detected
- Micro-controlled with BLE
- Sends/Receives commands through BLE Advertising
- Receives commands through BLE Connection
- Routes BLE advertising through BLE Connection, bidirectionally

## Train Control Panel
- Progressive WebApp with Web Bluetooth integration
- Shows layout map
- Shows trains presences on segments
- Shows switches status
- Shows lights status
- Command for each switch
- Command for each train speed, direction, stop
- Receives commands through BLE Connection
- Sends commands through BLE Connection
- Adds trains (controlled or uncontrolled) to a layout
- Simulator mode
- Requirements:
  - Windows 10, Chrome 70
  - Android 6, Mobile Chrome
  - iOS WebBLE browser (https://www.greenparksoftware.co.uk/projects/webble)
