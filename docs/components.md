# Components

## Segment
- Denotes a part of track (may include switch and branches) where only at most one train can be located. Normally start at a switch and end at a switch
- Occupied or free segment
- One segment has several possible paths, that may depend on switches positions

## Switch
- Track switch (or turnout) with two positions
- Micro-controlled with BLE
- Two positions
- Commanded only by UI
- Can change segment configuration between positions (?)
- Defers/prevents switching if train is in-between segments
- Receives commands through BLE Advertising

## Signal light
- Is a two mutual exclusive LEDs: reg and green
- Micro-controlled with BLE
- Pertains to exiting one segment
- Set green light, if: next segment is free, red otherwise
- Calculates "next segment" with map, switch positions and trains presences
- Receives commands through BLE Advertising

## Track milestone
- Emitter to signal segment exit and thus a signal light
- Micro-controlled with BLE
- Advertises at low power
- Only advertises if corresponding signal light is red
- Sends/Receives commands through BLE Advertising

## Train Driver
- Micro-controlled with BLE
- Stops when milestone is detected
- Filters for milestone that is in segment and according to train dir
- Sends/Receives commands through BLE Advertising
- Receives commands through BLE Connection
- Routes BLE advertising through BLE Connection, bidirectionally

## Command Center UI
- Progressive WebApp with Web Bluetooth integration
- Shows layout map
- Shows trains presences on segments
- Shows switch status
- Shows lights status
- Command for each switch
- Command for each train speed, direction, stop
- Receives commands through BLE Connection
- Sends commands through BLE Connection
- Requirements:
  - Windows 10, Chrome 70
  - Android 6, Mobile Chrome
  - iOS WebBLE browser (https://www.greenparksoftware.co.uk/projects/webble)
